#!/usr/bin/env python3
"""kordoc CLI 래퍼 — GIL doc-reader / hwpx-writer / form-filler / doc-redactor 공용.

kordoc(chrisryugj/kordoc, MIT) CLI를 메이저 고정(`kordoc@^4`)으로 안전하게 실행한다.
표준 라이브러리만 사용한다. Python 3.10+, Node.js 20+ 필요.

핵심 역할
  1. node / npx 탐지 (Windows는 npx.cmd) 및 Node 20 미만 경고
  2. 중립 작업 디렉터리에서 실행 — `package.json`의 name이 kordoc인 폴더(원본 저장소 클론 등)
     안에서 `npx kordoc`를 치면 로컬 미빌드 패키지로 해석돼 `kordoc: not found`가 난다
  3. parse 결과(JSON)의 warnings·실패 코드를 요약해 stderr 로 보고
  4. --auto-ocr: NEEDS_OCR / IMAGE_BASED_PDF 가 나오면 --ocr 로 1회 자동 재시도

사용 예
  python kordoc_run.py check                                   # 환경 점검(node·npx·kordoc 버전)
  python kordoc_run.py parse 문서.hwpx -o 문서.md              # 마크다운
  python kordoc_run.py parse 문서.pdf --format json -o 문서.json --auto-ocr --html-tables
  python kordoc_run.py parse 문서.pdf --format chunks --plain -o 청크.json
  python kordoc_run.py raw tables 문서.hwpx --json               # 그 외 서브커맨드는 raw 로 그대로 전달
  python kordoc_run.py raw generate 초안.md -o 결과.hwpx --preset 보고서
  python kordoc_run.py raw validate 결과.hwpx --json

종료 코드: kordoc 의 종료 코드를 그대로 돌려준다(성공 0). 환경 문제는 2.
"""
from __future__ import annotations

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

KORDOC_SPEC = os.environ.get("GIL_KORDOC_SPEC", "kordoc@^4")
MIN_NODE_MAJOR = 20
RETRY_CODES = {"NEEDS_OCR", "IMAGE_BASED_PDF"}


def _which_npx() -> str | None:
    for name in ("npx.cmd", "npx") if os.name == "nt" else ("npx",):
        p = shutil.which(name)
        if p:
            return p
    return None


def _node_version() -> tuple[int, str] | None:
    node = shutil.which("node")
    if not node:
        return None
    try:
        out = subprocess.run([node, "--version"], capture_output=True, text=True, timeout=20).stdout.strip()
    except Exception:  # noqa: BLE001
        return None
    try:
        major = int(out.lstrip("v").split(".")[0])
    except ValueError:
        major = 0
    return major, out


def _neutral_cwd() -> str:
    """package.json 이 없는 임시 디렉터리 — npx 의 로컬 패키지 오해석 방지."""
    d = Path(tempfile.gettempdir()) / "gil-kordoc-run"
    d.mkdir(parents=True, exist_ok=True)
    return str(d)


def _abs(p: str) -> str:
    return str(Path(p).expanduser().resolve())


def run_kordoc(args: list[str], *, capture: bool = False, timeout: int = 900) -> subprocess.CompletedProcess:
    npx = _which_npx()
    if not npx:
        print("[kordoc_run] npx 를 찾을 수 없습니다 — Node.js 20+ 설치 후 다시 실행하세요 (gil:env-preflight 참고)", file=sys.stderr)
        sys.exit(2)
    nv = _node_version()
    if nv and nv[0] and nv[0] < MIN_NODE_MAJOR:
        print(f"[kordoc_run] ⚠️ Node {nv[1]} — kordoc 4.x 는 Node {MIN_NODE_MAJOR}+ 를 요구합니다. 일부 기능이 실패할 수 있습니다", file=sys.stderr)
    cmd = [npx, "-y", KORDOC_SPEC, *args]
    env = dict(os.environ)
    env.setdefault("NO_UPDATE_NOTIFIER", "1")
    return subprocess.run(cmd, cwd=_neutral_cwd(), capture_output=capture, text=True, encoding="utf-8",
                          errors="replace", timeout=timeout, env=env)


def _summarize_warnings(data: dict) -> None:
    ws = data.get("warnings") or []
    if not ws:
        return
    counts: dict[str, int] = {}
    for w in ws:
        code = w.get("code", "?") if isinstance(w, dict) else str(w)
        counts[code] = counts.get(code, 0) + 1
    summary = ", ".join(f"{k}×{v}" for k, v in sorted(counts.items()))
    print(f"[kordoc_run] warnings: {summary}", file=sys.stderr)
    for w in ws[:5]:
        if isinstance(w, dict):
            page = f" p.{w['page']}" if w.get("page") else ""
            print(f"  - {w.get('code')}{page}: {w.get('message')}", file=sys.stderr)


def cmd_check(_: argparse.Namespace) -> int:
    nv = _node_version()
    npx = _which_npx()
    print(f"node: {nv[1] if nv else 'missing'}")
    print(f"npx : {npx or 'missing'}")
    if not npx:
        return 2
    r = run_kordoc(["--version"], capture=True, timeout=300)
    print(f"kordoc({KORDOC_SPEC}): {(r.stdout or r.stderr).strip().splitlines()[-1] if (r.stdout or r.stderr).strip() else '?'}")
    return r.returncode


def cmd_parse(ns: argparse.Namespace) -> int:
    src = _abs(ns.file)
    if not Path(src).exists():
        print(f"[kordoc_run] 파일 없음: {src}", file=sys.stderr)
        return 2
    passthrough = list(ns.extra)
    fmt = ns.format
    out = _abs(ns.output) if ns.output else None

    def build(extra_flags: list[str]) -> list[str]:
        a = [src, "--format", fmt, "--silent", *extra_flags, *passthrough]
        if out:
            a += ["-o", out]
        return a

    r = run_kordoc(build([]), capture=True)
    payload = r.stdout
    data = None
    if fmt == "json":
        try:
            data = json.loads(Path(out).read_text(encoding="utf-8")) if out else json.loads(payload)
        except Exception:  # noqa: BLE001
            data = None
    elif r.returncode != 0 and payload.strip().startswith("{"):
        # 실패는 모든 포맷에서 stdout 에 {success:false, code} JSON — 기계 계약(#69)
        try:
            data = json.loads(payload)
        except Exception:  # noqa: BLE001
            data = None

    codes: set[str] = set()
    if isinstance(data, dict):
        if data.get("success") is False:
            print(f"[kordoc_run] FAIL {data.get('code')}: {data.get('error')}", file=sys.stderr)
            codes.add(str(data.get("code")))
        _summarize_warnings(data)
        for w in data.get("warnings") or []:
            if isinstance(w, dict):
                codes.add(str(w.get("code")))

    if ns.auto_ocr and (codes & RETRY_CODES) and "--ocr" not in passthrough:
        print("[kordoc_run] OCR 필요 신호 감지 → --ocr 로 재시도 (첫 사용 시 모델 ~18MB 로컬 다운로드)", file=sys.stderr)
        r = run_kordoc(build(["--ocr"]), capture=True)
        payload = r.stdout
        if fmt == "json":
            try:
                data = json.loads(Path(out).read_text(encoding="utf-8")) if out else json.loads(payload)
                _summarize_warnings(data)
            except Exception:  # noqa: BLE001
                pass

    if not out and payload:
        sys.stdout.write(payload)
    if r.stderr and r.returncode != 0:
        sys.stderr.write(r.stderr)
    return r.returncode


def cmd_raw(ns: argparse.Namespace) -> int:
    args = list(ns.args)
    # 파일 인자는 중립 cwd 에서 실행되므로 절대경로로 바꿔 준다(옵션값은 건드리지 않음)
    fixed: list[str] = []
    prev_opt = False
    for a in args:
        if prev_opt:
            fixed.append(_abs(a) if (a.endswith((".hwpx", ".hwp", ".hml", ".pdf", ".docx", ".xlsx", ".xls", ".md", ".json", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".html")) and not a.startswith("-")) else a)
            prev_opt = False
            continue
        if a.startswith("-"):
            fixed.append(a)
            prev_opt = a in {"-o", "--output", "-d", "--out-dir", "-j", "--json", "--image", "--profile", "--profile-path", "-i"}
            continue
        p = Path(a).expanduser()
        fixed.append(str(p.resolve()) if p.exists() or a.endswith((".hwpx", ".hwp", ".hml", ".pdf", ".docx", ".xlsx", ".xls", ".md", ".svg", ".png", ".jpg", ".html")) else a)
    r = run_kordoc(fixed, capture=False)
    return r.returncode


def main() -> int:
    ap = argparse.ArgumentParser(description="GIL kordoc CLI 래퍼")
    sub = ap.add_subparsers(dest="cmd", required=True)

    sub.add_parser("check", help="node·npx·kordoc 버전 확인").set_defaults(fn=cmd_check)

    p = sub.add_parser("parse", help="문서 → markdown/json/chunks")
    p.add_argument("file")
    p.add_argument("--format", choices=["markdown", "json", "chunks"], default="markdown")
    p.add_argument("-o", "--output")
    p.add_argument("--auto-ocr", action="store_true", help="NEEDS_OCR/IMAGE_BASED_PDF 시 --ocr 1회 자동 재시도")
    p.set_defaults(fn=cmd_parse)  # 그 외 kordoc 파싱 플래그(--plain --html-tables -p 1-3 --password ...)는 그대로 전달

    r = sub.add_parser("raw", help="kordoc 서브커맨드 그대로 전달 (tables·crop·render·generate·validate·lint·fill·seal·patch·redact·profile)")
    r.add_argument("args", nargs=argparse.REMAINDER)
    r.set_defaults(fn=cmd_raw)

    ns, unknown = ap.parse_known_args()
    unknown = [a for a in unknown if a != "--"]
    if ns.cmd == "parse":
        ns.extra = unknown
    elif unknown:
        ap.error(f"알 수 없는 인자: {unknown}")
    if getattr(ns, "args", None) and ns.args and ns.args[0] == "--":
        ns.args = ns.args[1:]
    return ns.fn(ns)


if __name__ == "__main__":
    sys.exit(main())

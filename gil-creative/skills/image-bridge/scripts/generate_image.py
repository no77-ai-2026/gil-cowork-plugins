#!/usr/bin/env python3
"""
gil-creative image-bridge — BYOK image generator (Phase 1, option A: sandbox direct call).

Providers: OpenAI (gpt-image family) / Google Gemini (Imagen / Gemini Image).
Keys are read from environment variables only (OPENAI_API_KEY / GEMINI_API_KEY).
Never persist keys to disk, logs, or memory.

If the sandbox blocks network egress, this script exits non-zero with a message
instructing the caller to fall back to option B (connector, e.g. gil:higgsfield-image).

Usage:
  python3 generate_image.py --provider openai --aspect 4:5 --mode overlay \
      --prompt "premium moisturizer hero background, soft light" --out hero_bg.png
"""
import argparse
import base64
import json
import os
import sys
import urllib.request
import urllib.error

ASPECT_TO_SIZE = {
    "1:1": "1024x1024",
    "4:5": "1024x1280",
    "9:16": "1024x1792",
    "16:9": "1792x1024",
}


def log(msg: str) -> None:
    print(f"[image-bridge] {msg}", file=sys.stderr)


def gen_openai(prompt: str, size: str, n: int, out: str) -> int:
    key = os.environ.get("OPENAI_API_KEY")
    if not key:
        log("OPENAI_API_KEY not set. Provide the key in the session env (BYOK). Not saved.")
        return 2
    payload = json.dumps({
        "model": os.environ.get("GIL_OPENAI_IMAGE_MODEL", "gpt-image-2"),  # GIL default (image-generation-runtime.md); 2.5 via gil-mcp-openai
        "prompt": prompt,
        "size": size,
        "n": n,
    }).encode()
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=payload,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = json.loads(r.read())
    except urllib.error.URLError as e:
        log(f"network/API error: {e}. Sandbox egress may be blocked -> fall back to connector (option B: gil:higgsfield-image).")
        return 3
    b64 = data["data"][0].get("b64_json")
    if not b64:
        log("no image data returned.")
        return 4
    with open(out, "wb") as f:
        f.write(base64.b64decode(b64))
    log(f"saved -> {out}")
    return 0


def gen_gemini(prompt: str, size: str, n: int, out: str) -> int:
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        log("GEMINI_API_KEY not set. Provide the key in the session env (BYOK). Not saved.")
        return 2
    # Endpoint/model string to be pinned to the latest Imagen/Gemini image model at build time.
    model = "imagen-4.0-generate-001"
    url = (
        f"https://generativelanguage.googleapis.com/v1beta/models/"
        f"{model}:predict?key={key}"
    )
    payload = json.dumps({
        "instances": [{"prompt": prompt}],
        "parameters": {"sampleCount": n},
    }).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = json.loads(r.read())
    except urllib.error.URLError as e:
        log(f"network/API error: {e}. Sandbox egress may be blocked -> fall back to connector (option B: gil:higgsfield-image).")
        return 3
    preds = data.get("predictions") or []
    if not preds:
        log("no image data returned.")
        return 4
    b64 = preds[0].get("bytesBase64Encoded")
    with open(out, "wb") as f:
        f.write(base64.b64decode(b64))
    log(f"saved -> {out}")
    return 0


def main() -> int:
    p = argparse.ArgumentParser()
    p.add_argument("--provider", choices=["openai", "gemini"], default="openai")
    p.add_argument("--aspect", choices=list(ASPECT_TO_SIZE), default="1:1")
    p.add_argument("--mode", choices=["flat", "overlay"], default="overlay",
                   help="overlay = background-only (post-composite copy). CIS/non-latin default.")
    p.add_argument("--prompt", required=True)
    p.add_argument("--n", type=int, default=1)
    p.add_argument("--out", default="creative_image.png")
    a = p.parse_args()

    prompt = a.prompt
    if a.mode == "overlay":
        prompt += (
            " | Background only, leave clean negative space for text overlay, "
            "NO embedded text or letters (copy is composited later)."
        )
    size = ASPECT_TO_SIZE[a.aspect]
    log(f"provider={a.provider} aspect={a.aspect} mode={a.mode} size={size}")
    if a.provider == "openai":
        return gen_openai(prompt, size, a.n, a.out)
    return gen_gemini(prompt, size, a.n, a.out)


if __name__ == "__main__":
    sys.exit(main())

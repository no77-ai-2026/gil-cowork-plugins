# GIL v1.0.1 → GitHub 푸시 안내

## 사전 조건
1. GitHub repo가 `no77-ai-2026/gil-cowork-plugins`로 존재해야 합니다 (구 `gkuz-cowork-plugins`라면 Settings → General → Rename).

## 푸시 (Windows)
`Plugin_Creator\push-gil-v1.0.1.bat` 더블클릭.

스크립트가 수행하는 일:
1. git identity 자동 설정 (`--local`)
2. origin을 `gil-cowork-plugins.git`으로 지정
3. `git push -u --force origin main` (fresh-root 단일 커밋이므로 force 필요)
4. `git ls-remote`로 로컬 HEAD == 원격 HEAD 검증

## 푸시 후 수동 작업
- GitHub About 사이드바 설명·토픽은 git으로 변경 불가 — `GITHUB-DESCRIPTION.md` 내용을 수동 입력

## 롤백
- 직전 권위본: `gil-cowork-plugins-repo-v1.0.0/` 폴더
- 백업: `backup-pre-v1.0.1-*.tar.gz`

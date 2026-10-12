🎯 **What:** Fixed the invalid version tag for the `JAIPilot/jaipilot-cli` GitHub Action to use `main` as the previous version fixes failed because neither `action-v1` nor `v1` exist.
💡 **Why:** The `generate-tests` CI job was failing with `Unable to resolve action`. The available tags for `JAIPilot/jaipilot-cli` are mostly dependabot heads and `main`. Using `main` resolves this issue.
✅ **Verification:** Verified the diff manually in `.github/workflows/jaipilot-generate.yml`. Tests continue to pass.
✨ **Result:** The `generate-tests` CI check should no longer fail with the `unable to resolve action` error.

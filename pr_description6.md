🎯 **What:** Fixed the invalid `action-v1` tag for the `JAIPilot/jaipilot-cli` GitHub Action.
💡 **Why:** The `generate-tests` CI job was failing with `Unable to resolve action \`jaipilot/jaipilot-cli@action-v1\``. I updated it to use the correct `v1` tag.
✅ **Verification:** Verified the diff manually in `.github/workflows/jaipilot-generate.yml`.
✨ **Result:** The `generate-tests` CI check should no longer fail with the `unable to resolve action` error.

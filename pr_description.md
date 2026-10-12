🎯 **What:** The `sanitizeLog` function in `deploy.js` was not properly escaping newline (`\n`) and carriage return (`\r`) characters from external APIs.
⚠️ **Risk:** A malicious or unexpected API response containing newline characters could be injected into the logs, allowing for log forging and potentially misleading audit trails or operational telemetry.
🛡️ **Solution:** Updated `sanitizeLog` to replace all instances of `\r` and `\n` with their escaped string counterparts (`\\r` and `\\n`), ensuring log entries remain structurally safe.

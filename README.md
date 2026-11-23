# @inthra/sdk

Node SDK for the Inthra public project API.

This package only includes endpoints that accept a project API key. Dashboard and account endpoints use browser sessions and are not part of the SDK.

Documentation: https://inthra.dev/en/docs/api/authentication

## Install

```bash
npm install @inthra/sdk
```

## Usage

```ts
import { Inthra } from "@inthra/sdk";

const inthra = new Inthra({
  apiKey: process.env.INTHRA_PROJECT_CREDENTIAL!,
});

const session = await inthra.auth.loginWithEmail("project_123", {
  email: "user@example.com",
  password: "correct-horse-battery-staple",
});
```

JavaScript works the same way:

```js
const { Inthra } = require("@inthra/sdk");
const inthra = new Inthra({ apiKey: process.env.INTHRA_PROJECT_CREDENTIAL });
const users = await inthra.users.list("project_123", { limit: 20 });
```

Keep project credentials on a trusted server. Never ship them in browser code.

## API groups

See [docs/api.md](docs/api.md) for the full function list.

- `auth`: signup, login, OTP, MFA challenge, verification, refresh, auth methods
- `oauth`: code exchange, required MFA continuation, authorization URL
- `users`: list, get, ban, unban, delete
- `sessions`: list project sessions, list user sessions, revoke sessions

## Development

```bash
bun run typecheck
bun run build
bun run test
```

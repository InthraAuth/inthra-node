# @inthraauth/sdk

Node SDK for the Inthra public project API.

This package only includes endpoints that accept a project API key. Dashboard and account endpoints use browser sessions and are not part of the SDK.

Documentation: https://inthra.dev/en/docs/api/authentication

## Install

```bash
npm install @inthraauth/sdk
```

## Usage

```ts
import { Inthra } from "@inthraauth/sdk";

const inthra = new Inthra({
  apiKey: process.env.INTHRA_PROJECT_CREDENTIAL!,
  projectId: process.env.INTHRA_PROJECT_ID!,
});

const session = await inthra.auth.loginWithEmail("project_123", {
  email: "user@example.com",
  password: "correct-horse-battery-staple",
});
```

JavaScript works the same way:

```js
const { Inthra } = require("@inthraauth/sdk");
const inthra = new Inthra({ apiKey: process.env.INTHRA_PROJECT_CREDENTIAL });
const users = await inthra.users.list("project_123", { limit: 20 });

// Passwordless customer access
await inthra.passwordless.requestCode({ email: "customer@example.com" });
const session = await inthra.passwordless.verifyCode({ email: "customer@example.com", code: "123456" });
```

Keep project credentials on a trusted server. Never ship them in browser code.

## API groups

See [docs/api.md](docs/api.md) for the full function list.

- `auth`: signup, login, OTP, MFA challenge, verification, refresh, auth methods
- `passwordless`: customer access code request and verification
- `oauth`: code exchange, required MFA continuation, authorization URL
- `users`: list, get, ban, unban, delete
- `sessions`: list project sessions, list user sessions, revoke sessions

## Development

```bash
bun run typecheck
bun run build
bun run test
```

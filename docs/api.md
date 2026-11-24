# SDK reference

All methods use the project API key configured on the `Inthra` client. Request and response schemas are documented in the Inthra API reference: https://inthra.dev/en/docs/api/authentication

## Constructor

### `new Inthra(options)`

Creates a client.

| Option | Type | Description |
| --- | --- | --- |
| `apiKey` | `string` or function | Project credential from the dashboard. |
| `baseUrl` | `string` | Optional API base URL. Defaults to `https://inthra.dev/api`. |
| `fetch` | `typeof fetch` | Optional custom fetch implementation. |
| `projectId` | `string` | Project ID used by `client.passwordless`. |

## `client.auth`

| Method | Description |
| --- | --- |
| `signup(projectId, params, signal?)` | Creates an end user in a project. |
| `loginWithEmail(projectId, params, signal?)` | Logs in with email and password. |
| `loginWithUsername(projectId, params, signal?)` | Logs in with username and password. |
| `requestEmailOTP(projectId, email, signal?)` | Sends a one time sign in code. |
| `loginWithEmailOTP(projectId, email, code, signal?)` | Completes passwordless sign in. |
| `completeMFALogin(projectId, params, signal?)` | Completes an MFA challenge. |
| `verifyEmail(projectId, params, signal?)` | Verifies an email address. |
| `refresh(refreshToken, signal?)` | Rotates a refresh token. |
| `getAuthMethods(projectId, signal?)` | Lists enabled sign in methods. |

## `client.passwordless`

| Method | Description |
| --- | --- |
| `requestCode({ email }, signal?)` | Sends a one-time customer access code. Requires `projectId` on the client. |
| `verifyCode({ email, code }, signal?)` | Verifies the code and returns the standard session or MFA challenge response. |

If the response contains `mfa_required`, call `client.auth.completeMFALogin(projectId, { challenge_token, code })`.

## `client.oauth`

| Method | Description |
| --- | --- |
| `exchange(code, signal?)` | Exchanges the one time OAuth code. |
| `startRequiredMFAEnrollment(params, signal?)` | Starts required TOTP enrollment. |
| `completeRequiredMFAEnrollment(params, signal?)` | Verifies enrollment and gets a session. |
| `authorizationUrl(projectId, provider, redirectUri)` | Builds the browser redirect URL. |

## `client.users`

| Method | Description |
| --- | --- |
| `list(projectId, query?, signal?)` | Lists project users. Supports `limit` and `offset`. |
| `get(projectId, userId, signal?)` | Gets one user. |
| `delete(projectId, userId)` | Deletes a user. |
| `ban(projectId, userId, reason?)` | Bans a user. |
| `unban(projectId, userId)` | Restores a banned user. |

## `client.sessions`

| Method | Description |
| --- | --- |
| `listProject(projectId, signal?)` | Lists active project sessions. |
| `listUser(projectId, userId, signal?)` | Lists sessions for one user. |
| `revoke(projectId, sessionId)` | Revokes one session. |
| `revokeAllForUser(projectId, userId)` | Revokes all sessions for one user. |

## Errors

Failed requests throw `ApiError` with an HTTP `status` and the API error message.

## Scope

The SDK does not include dashboard operations, account sessions, organization management, API key management, webhook configuration, audit logs, or end user `/me` endpoints that require a user session token.

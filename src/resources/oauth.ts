import type {
  CompleteOAuthMFAEnrollmentRequest,
  CompleteOAuthMFAEnrollmentResponse,
  OAuthExchangeResponse,
  OAuthProvider,
  StartOAuthMFAEnrollmentRequest,
  StartOAuthMFAEnrollmentResponse,
} from "../types";
import type { RequestFn } from "../transport";

/** OAuth helpers for server side flows. */
export class OAuthResource {
  constructor(
    private readonly request: RequestFn,
    private readonly baseUrl: string,
  ) {}

  /** Exchanges the one time code delivered to your redirect URI. */
  exchange(code: string, signal?: AbortSignal) {
    return this.request<OAuthExchangeResponse>({
      method: "POST",
      path: "/v1/oauth/exchange",
      body: { code },
      signal,
    });
  }

  /** Starts required TOTP enrollment after an OAuth sign in. */
  startRequiredMFAEnrollment(params: StartOAuthMFAEnrollmentRequest, signal?: AbortSignal) {
    return this.request<StartOAuthMFAEnrollmentResponse>({
      method: "POST",
      path: "/v1/oauth/mfa/enroll",
      body: params,
      signal,
    });
  }

  /** Verifies required TOTP enrollment and receives a session. */
  completeRequiredMFAEnrollment(params: CompleteOAuthMFAEnrollmentRequest, signal?: AbortSignal) {
    return this.request<CompleteOAuthMFAEnrollmentResponse>({
      method: "POST",
      path: "/v1/oauth/mfa/verify",
      body: params,
      signal,
    });
  }

  /** Builds the browser URL for an OAuth sign in redirect. */
  authorizationUrl(projectId: string, provider: OAuthProvider, redirectUri: string) {
    const url = new URL(`${this.baseUrl}/v1/projects/${projectId}/oauth/${provider}/authorize`);
    url.searchParams.set("redirect_uri", redirectUri);
    return url.toString();
  }
}

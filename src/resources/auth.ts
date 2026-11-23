import type {
  AuthMethodsResponse,
  CompleteMFALoginRequest,
  LoginEmailRequest,
  LoginResponse,
  LoginUsernameRequest,
  RefreshSessionRequest,
  RefreshSessionResponse,
  SignupRequest,
  SignupResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "../types";
import type { RequestFn } from "../transport";

/** End user authentication operations that accept a project API key. */
export class AuthResource {
  constructor(private readonly request: RequestFn) {}

  /** Creates an end user in a project. */
  signup(projectId: string, params: SignupRequest, signal?: AbortSignal) {
    return this.request<SignupResponse>({
      method: "POST",
      path: `/v1/projects/${projectId}/signup`,
      body: params,
      signal,
    });
  }

  /** Logs in with email and password. */
  loginWithEmail(projectId: string, params: LoginEmailRequest, signal?: AbortSignal) {
    return this.request<LoginResponse>({
      method: "POST",
      path: `/v1/projects/${projectId}/login`,
      body: params,
      signal,
    });
  }

  /** Logs in with username and password. */
  loginWithUsername(projectId: string, params: LoginUsernameRequest, signal?: AbortSignal) {
    return this.request<LoginResponse>({
      method: "POST",
      path: `/v1/projects/${projectId}/login`,
      body: params,
      signal,
    });
  }

  /** Sends a single use sign in code to a verified email address. */
  requestEmailOTP(projectId: string, email: string, signal?: AbortSignal) {
    return this.request<{ message: string }>({
      method: "POST",
      path: `/v1/projects/${projectId}/login/otp/request`,
      body: { email },
      signal,
    });
  }

  /** Completes passwordless sign in with an email code. */
  loginWithEmailOTP(projectId: string, email: string, code: string, signal?: AbortSignal) {
    return this.request<LoginResponse>({
      method: "POST",
      path: `/v1/projects/${projectId}/login/otp`,
      body: { email, code },
      signal,
    });
  }

  /** Completes an MFA challenge returned by a login response. */
  completeMFALogin(projectId: string, params: CompleteMFALoginRequest, signal?: AbortSignal) {
    return this.request<LoginResponse>({
      method: "POST",
      path: `/v1/projects/${projectId}/login/mfa`,
      body: params,
      signal,
    });
  }

  /** Confirms an end user email address with a verification token. */
  verifyEmail(projectId: string, params: VerifyEmailRequest, signal?: AbortSignal) {
    return this.request<VerifyEmailResponse>({
      method: "POST",
      path: `/v1/projects/${projectId}/verify`,
      body: params,
      signal,
    });
  }

  /** Rotates a refresh token for a new token pair. */
  refresh(refreshToken: string, signal?: AbortSignal) {
    const body: RefreshSessionRequest = { refresh_token: refreshToken };
    return this.request<RefreshSessionResponse>({
      method: "POST",
      path: "/v1/refresh",
      body,
      signal,
    });
  }

  /** Lists the sign in methods enabled for a project. */
  getAuthMethods(projectId: string, signal?: AbortSignal) {
    return this.request<AuthMethodsResponse>({
      method: "GET",
      path: `/v1/projects/${projectId}/auth-methods`,
      signal,
    });
  }
}

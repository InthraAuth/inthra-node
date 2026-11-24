import type {
  LoginResponse,
  PasswordlessCodeResponse,
  RequestPasswordlessCodeRequest,
  VerifyPasswordlessCodeRequest,
} from "../types";
import type { RequestFn } from "../transport";

/**
 * Passwordless customer access. Customers enter an email, verify a code, and
 * Inthra resolves or creates their project-scoped identity.
 */
export class PasswordlessResource {
  constructor(
    private readonly request: RequestFn,
    private readonly projectId?: string,
  ) {}

  private path(action: string): string {
    if (!this.projectId) {
      throw new Error("projectId is required for passwordless access");
    }
    return `/v1/projects/${this.projectId}/passwordless/${action}`;
  }

  /** Sends a one-time access code to the customer email. */
  requestCode(params: RequestPasswordlessCodeRequest, signal?: AbortSignal) {
    return this.request<PasswordlessCodeResponse>({
      method: "POST",
      path: this.path("request-code"),
      body: { email: params.email },
      signal,
    });
  }

  /** Verifies the code and completes the normal authentication lifecycle. */
  verifyCode(params: VerifyPasswordlessCodeRequest, signal?: AbortSignal) {
    return this.request<LoginResponse>({
      method: "POST",
      path: this.path("verify-code"),
      body: { email: params.email, code: params.code },
      signal,
    });
  }
}

import type { components } from "./api-types";

export type ErrorResponse = { error: string };
export type UserStatus = "active" | "banned";

export type SignupRequest = {
  username: string;
  email: string;
  password: string;
};

export type SignupResponse = {
  user_id: string;
  username: string;
  email: string;
  status: UserStatus;
  created_at: string;
  is_oauth: boolean;
  is_mfa_enabled: boolean;
};

export type LoginEmailRequest = { email: string; password: string };
export type LoginUsernameRequest = { username: string; password: string };

/** A login returns either a session pair or an MFA challenge. */
export type LoginResponse = {
  access_token?: string;
  refresh_token?: string;
  mfa_required?: boolean;
  challenge_token?: string;
};

export type VerifyEmailRequest = { token: string; user_id: string };
export type VerifyEmailResponse = { message: string };

export type RefreshSessionRequest = { refresh_token: string };
export type RefreshSessionResponse = {
  access_token: string;
  refresh_token: string;
};

export type AuthMethodsResponse = { methods: Array<string> };

export type User = {
  id: string;
  project_id: string;
  username: string;
  email: string;
  status: UserStatus;
  created_at: string;
  banned_at?: string | null;
  ban_reason?: string | null;
  is_mfa_enabled?: boolean;
};

export type ListUsersQuery = { limit?: number; offset?: number };

export type SessionResponse = {
  id: string;
  user_id: string;
  user_agent?: string | null;
  ip_address?: string | null;
  created_at: string;
  expires_at: string;
  last_used_at?: string | null;
};

export type MFAEnrollResponse = components["schemas"]["MFAEnrollResponse"];
export type MFAEnableResponse = components["schemas"]["MFAEnableResponse"];

export type CompleteMFALoginRequest = {
  challenge_token: string;
  code: string;
};

export type OAuthExchangeResponse = {
  access_token?: string;
  refresh_token?: string;
  mfa_required?: boolean;
  challenge_token?: string;
  linked?: boolean;
  mfa_enrollment_required?: boolean;
  enrollment_token?: string;
};

export type StartOAuthMFAEnrollmentRequest = {
  enrollment_token: string;
  account_name: string;
};

export type StartOAuthMFAEnrollmentResponse = {
  secret: string;
  otpauth_url: string;
  verification_token: string;
};

export type CompleteOAuthMFAEnrollmentRequest = {
  verification_token: string;
  code: string;
};

export type CompleteOAuthMFAEnrollmentResponse = RefreshSessionResponse & {
  recovery_codes: Array<string>;
};

export type OAuthProvider = "google" | "discord";

import type { SessionResponse } from "../types";
import type { RequestFn } from "../transport";

/** Session administration operations. */
export class SessionsResource {
  constructor(private readonly request: RequestFn) {}

  /** Lists active sessions in a project. */
  listProject(projectId: string, signal?: AbortSignal) {
    return this.request<SessionResponse[]>({
      method: "GET",
      path: `/v1/projects/${projectId}/sessions`,
      signal,
    });
  }

  /** Lists active sessions for one user. */
  listUser(projectId: string, userId: string, signal?: AbortSignal) {
    return this.request<SessionResponse[]>({
      method: "GET",
      path: `/v1/projects/${projectId}/users/${userId}/sessions`,
      signal,
    });
  }

  /** Revokes one session. */
  revoke(projectId: string, sessionId: string) {
    return this.request<void>({
      method: "DELETE",
      path: `/v1/projects/${projectId}/sessions/${sessionId}`,
    });
  }

  /** Revokes all sessions for one user. */
  revokeAllForUser(projectId: string, userId: string) {
    return this.request<void>({
      method: "DELETE",
      path: `/v1/projects/${projectId}/users/${userId}/sessions`,
    });
  }
}

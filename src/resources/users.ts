import type { ListUsersQuery, User } from "../types";
import type { RequestFn } from "../transport";

/** Project user administration operations. */
export class UsersResource {
  constructor(private readonly request: RequestFn) {}

  /** Lists users in a project with optional pagination. */
  list(projectId: string, query: ListUsersQuery = {}, signal?: AbortSignal) {
    const params = new URLSearchParams();
    if (query.limit !== undefined) params.set("limit", String(query.limit));
    if (query.offset !== undefined) params.set("offset", String(query.offset));
    const suffix = params.size > 0 ? `?${params}` : "";
    return this.request<User[]>({
      method: "GET",
      path: `/v1/projects/${projectId}/users${suffix}`,
      signal,
    });
  }

  /** Gets one user by ID. */
  get(projectId: string, userId: string, signal?: AbortSignal) {
    return this.request<User>({
      method: "GET",
      path: `/v1/projects/${projectId}/users/${userId}`,
      signal,
    });
  }

  /** Deletes a user and revokes their sessions. */
  delete(projectId: string, userId: string) {
    return this.request<void>({
      method: "DELETE",
      path: `/v1/projects/${projectId}/users/${userId}`,
    });
  }

  /** Bans a user and revokes their sessions. */
  ban(projectId: string, userId: string, reason?: string) {
    return this.request<User>({
      method: "POST",
      path: `/v1/projects/${projectId}/users/${userId}/ban`,
      body: reason === undefined ? undefined : { reason },
    });
  }

  /** Restores a banned user. Existing sessions stay revoked. */
  unban(projectId: string, userId: string) {
    return this.request<User>({
      method: "POST",
      path: `/v1/projects/${projectId}/users/${userId}/unban`,
    });
  }
}

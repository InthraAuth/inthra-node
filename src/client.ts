import { ApiError } from "./errors";
import type { InthraOptions, RequestFn, RequestOptions } from "./transport";
import { AuthResource } from "./resources/auth";
import { OAuthResource } from "./resources/oauth";
import { UsersResource } from "./resources/users";
import { SessionsResource } from "./resources/sessions";

/**
 * Server side client for the Inthra public project API.
 *
 * Only endpoints that accept a project API key are included.
 * See https://inthra.dev/docs/api/authentication.
 */
export class Inthra {
  readonly auth: AuthResource;
  readonly oauth: OAuthResource;
  readonly users: UsersResource;
  readonly sessions: SessionsResource;

  private readonly apiKey: string | (() => string);
  private readonly baseUrl: string;
  private readonly fetchImpl: typeof fetch;

  /** Creates a new Inthra client. */
  constructor(options: InthraOptions) {
    if (!options.apiKey) throw new Error("apiKey is required");
    this.apiKey = options.apiKey;
    this.baseUrl = (options.baseUrl ?? "https://api.inthra.dev").replace(/\/+$/, "");
    this.fetchImpl = options.fetch ?? fetch;

    const request: RequestFn = this.request.bind(this) as RequestFn;
    this.auth = new AuthResource(request);
    this.oauth = new OAuthResource(request, this.baseUrl);
    this.users = new UsersResource(request);
    this.sessions = new SessionsResource(request);
  }

  private credential(): string {
    return typeof this.apiKey === "function" ? this.apiKey() : this.apiKey;
  }

  private async request<T>(options: RequestOptions): Promise<T> {
    const headers = new Headers({
      Authorization: `Bearer ${this.credential()}`,
      Accept: "application/json",
    });
    if (options.body !== undefined) headers.set("Content-Type", "application/json");

    const response = await this.fetchImpl(`${this.baseUrl}${options.path}`, {
      method: options.method,
      headers,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal,
      credentials: "omit",
    });

    if (!response.ok) {
      let message = "request failed";
      try {
        const body = (await response.json()) as { error?: string };
        if (typeof body.error === "string") message = body.error;
      } catch {
        // The error body is not JSON.
      }
      throw new ApiError(response.status, message);
    }

    if (response.status === 204) return undefined as T;
    return (await response.json()) as T;
  }
}

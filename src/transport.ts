/** Options used to create an Inthra client. */
export type InthraOptions = {
  /** Project credential created in the Inthra dashboard. Keep it server side. */
  apiKey: string | (() => string);
  /** API base URL. Defaults to https://api.inthra.dev. */
  baseUrl?: string;
  /** Custom fetch implementation, useful for tests or proxies. */
  fetch?: typeof fetch;
};

/** Internal request description used by resource modules. */
export type RequestOptions = {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  body?: unknown;
  signal?: AbortSignal;
};

/** Typed request function passed to resource modules. */
export type RequestFn = <T>(options: RequestOptions) => Promise<T>;

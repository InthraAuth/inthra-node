/** Error returned when the API responds with a non success status. */
export class ApiError extends Error {
  /** HTTP status code returned by the API. */
  readonly status: number;

  /** Creates an API error with the given status and message. */
  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

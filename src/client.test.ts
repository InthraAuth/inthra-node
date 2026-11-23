import { describe, expect, test } from "bun:test";
import { Inthra } from "./client";
import { ApiError } from "./errors";

describe("Inthra SDK", () => {
  test("sends the project credential on public project endpoints", async () => {
    const calls: Array<{ url: string; init: RequestInit }> = [];
    const fetchMock = (async (url: string, init: RequestInit) => {
      calls.push({ url, init });
      return new Response(JSON.stringify({ methods: ["email_password"] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }) as typeof fetch;

    const client = new Inthra({ apiKey: "inthra_test", baseUrl: "https://api.test", fetch: fetchMock });
    const result = await client.auth.getAuthMethods("project-1");

    expect(result.methods[0]).toBe("email_password");
    expect(calls[0].url).toBe("https://api.test/v1/projects/project-1/auth-methods");
    expect((calls[0].init.headers as Headers).get("Authorization")).toBe("Bearer inthra_test");
  });

  test("maps API errors to ApiError with status", async () => {
    const fetchMock = (async () =>
      new Response(JSON.stringify({ error: "invalid credentials" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })) as typeof fetch;
    const client = new Inthra({ apiKey: "inthra_test", fetch: fetchMock });

    try {
      await client.auth.loginWithEmail("project-1", { email: "a@example.com", password: "bad" });
      throw new Error("expected failure");
    } catch (error) {
      expect(error instanceof ApiError).toBe(true);
      expect((error as ApiError).status).toBe(400);
    }
  });
});

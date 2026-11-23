declare module "bun:test" {
  export const describe: (name: string, fn: () => void) => void;
  export const test: (name: string, fn: () => void) => void;
  export const expect: (received: unknown) => {
    toBe: (expected: unknown) => void;
    toEqual: (expected: unknown) => void;
  };
}

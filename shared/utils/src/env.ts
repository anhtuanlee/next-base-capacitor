export function getEnv(key: string, fallback?: string): string {
  if (typeof process !== "undefined" && process.env && key in process.env) {
    const v = process.env[key];
    if (v !== undefined) return v as string;
  }
  if (typeof window !== "undefined") {
    // Support NEXT_PUBLIC_* envs exposed to client
    // @ts-ignore
    const v = (window as any)[key];
    if (v) return v;
  }
  if (fallback !== undefined) return fallback;
  throw new Error(`Missing env: ${key}`);
}

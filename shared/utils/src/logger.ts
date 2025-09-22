export type LogLevel = "debug" | "info" | "warn" | "error";

export function createLogger(ns: string) {
  return {
    debug: (...args: any[]) => console.debug(`[${ns}]`, ...args),
    info: (...args: any[]) => console.info(`[${ns}]`, ...args),
    warn: (...args: any[]) => console.warn(`[${ns}]`, ...args),
    error: (...args: any[]) => console.error(`[${ns}]`, ...args),
  } as const;
}

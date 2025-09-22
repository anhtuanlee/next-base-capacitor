export function namespacedStorage(ns: string) {
  const key = (k: string) => `${ns}:${k}`;
  return {
    get<T>(k: string, fallback: T | null = null): T | null {
      try {
        const raw = localStorage.getItem(key(k));
        if (!raw) return fallback;
        return JSON.parse(raw) as T;
      } catch {
        return fallback;
      }
    },
    set<T>(k: string, v: T) {
      localStorage.setItem(key(k), JSON.stringify(v));
    },
    remove(k: string) {
      localStorage.removeItem(key(k));
    },
    clearAll() {
      const keys = Object.keys(localStorage);
      for (const k of keys) if (k.startsWith(`${ns}:`)) localStorage.removeItem(k);
    },
  } as const;
}

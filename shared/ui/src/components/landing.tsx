import * as React from "react";
import { Button } from "./button";

export function Landing() {
  return (
    <main className="min-h-[100svh] grid place-items-center p-6">
      <section className="w-full max-w-3xl text-center space-y-6">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
          Build once. Run on web and native with Capacitor.
        </h1>
        <p className="text-base md:text-lg text-gray-500 dark:text-gray-400">
          Shared UI components powered by Tailwind + shadcn. This landing renders in
          both apps/web and apps/mobile.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button>Get started</Button>
          <a
            href="https://capacitorjs.com/"
            className="text-sm text-gray-600 dark:text-gray-300 underline underline-offset-4"
          >
            Learn Capacitor
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
          <Feature title="Shared UI" desc="Use @shared/ui in web and mobile."></Feature>
          <Feature title="Static Export" desc="Next.js output: 'export'."></Feature>
          <Feature title="One Codebase" desc="Capacitor loads the mobile build."></Feature>
        </div>
      </section>
    </main>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="rounded-lg border p-4 text-left">
      <h3 className="font-semibold mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{desc}</p>
    </div>
  );
}

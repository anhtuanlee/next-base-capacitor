"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SignupForm } from "@shared/ui";
import { useAuthStore } from "@shared/state";

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { setUser } = useAuthStore();

  const handleSuccess = () => {
    router.push("/");
  };

  const handleError = (error: string) => {
    setError(error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <button
              onClick={() => router.push("/login")}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              sign in to your existing account
            </button>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <SignupForm onSuccess={handleSuccess} onError={handleError} />
      </div>
    </div>
  );
}

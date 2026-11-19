"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    const supabase = createClient();

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/");
        router.refresh();
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for a confirmation link.");
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="card-modern w-full max-w-md p-6 sm:p-10 shadow-card ring-subtle">
        <h1 className="mb-8 text-center font-display text-3xl font-bold text-ink-heading">
          {mode === "login" ? "Sign In" : "Create Account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="label-modern">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-modern"
                required
              />
            </div>
          )}

          <div>
            <label className="label-modern">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-modern"
              required
            />
          </div>

          <div>
            <label className="label-modern">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-modern"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="rounded-xl border border-destructive/20 bg-destructive-soft p-3 text-sm font-medium text-destructive">
              {error}
            </p>
          )}
          {message && (
            <p className="rounded-xl border border-success/20 bg-success-soft p-3 text-sm font-medium text-success">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5"
          >
            {loading
              ? "Loading..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="font-semibold text-brand hover:underline"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="font-semibold text-brand hover:underline"
              >
                Sign In
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

export default function LoginPage() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const locale = useLocale();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const supabase = createClient();

      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          const messages: Record<string, string> = {
            invalid_credentials: t("errors.invalidCredentials"),
            email_not_confirmed: t("errors.emailNotConfirmed"),
          };
          setError(messages[error.code ?? ""] ?? t("errors.generic"));
        } else {
          router.push(`/${locale}`);
          router.refresh();
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) {
          const messages: Record<string, string> = {
            user_already_exists: t("errors.accountExists"),
            weak_password: t("errors.weakPassword"),
            invalid_email: t("errors.invalidEmail"),
            signup_disabled: t("errors.signupUnavailable"),
          };
          setError(messages[error.code ?? ""] ?? t("errors.generic"));
        } else {
          setMessage(t("confirmationSent"));
        }
      }
    } catch {
      setError(t("errors.generic"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="card-modern w-full max-w-md p-6 sm:p-10 shadow-card ring-subtle">
        <h1 className="mb-8 text-center font-display text-3xl font-bold text-ink-heading">
          {mode === "login" ? t("signIn") : t("createAccount")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label htmlFor="full-name" className="label-modern">{t("fullName")}</label>
              <input
                id="full-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="input-modern"
                required
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="label-modern">{t("email")}</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-modern"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="label-modern">{t("password")}</label>
            <input
              id="password"
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
              ? t("loading")
              : mode === "login"
                ? t("signIn")
                : t("createAccount")}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          {mode === "login" ? (
            <>
              {t("switchToSignUp")}{" "}
              <button
                onClick={() => setMode("signup")}
                className="font-semibold text-brand hover:underline"
              >
                {t("signUp")}
              </button>
            </>
          ) : (
            <>
              {t("switchToSignIn")}{" "}
              <button
                onClick={() => setMode("login")}
                className="font-semibold text-brand hover:underline"
              >
                {t("signIn")}
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

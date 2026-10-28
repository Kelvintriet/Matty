"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, Check, Eye, EyeOff, Sparkles } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import AuthVisual from "./auth-visual";

export default function AuthPage({ signup }: { signup: boolean }) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function destination() {
    const next = new URLSearchParams(window.location.search).get("next");
    return next && next.startsWith("/") && !next.startsWith("//") && !next.includes("\\") ? next : "/learning";
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = signup
        ? await authClient.signUp.email({ name: name.trim(), email: email.trim(), password })
        : await authClient.signIn.email({ email: email.trim(), password });
      if (result.error) {
        setError(result.error.message || "Something went wrong. Please try again.");
      } else {
        router.push(destination());
      }
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const otherPage = signup ? "/login" : "/signup";

  function switchPage() {
    const next = new URLSearchParams(window.location.search).get("next");
    router.push(next ? `${otherPage}?next=${encodeURIComponent(next)}` : otherPage);
  }

  return (
    <main className="auth-page">
      <div className="auth-page-header">
        <Link href="/learning" className="auth-return"><ArrowLeft size={17} /> Back to learning</Link>
        <span>GRADE 10 <span>·</span> MYP 5</span>
      </div>
      <div className="auth-layout">
        <section className="auth-form-side">
          <div className="auth-form-inner">
            <span className="auth-page-kicker"><span /> YOUR MATH SPACE</span>
            {isPending ? <p className="auth-session-loading">Loading...</p> : session ? (
              <>
                <h1>You&apos;re signed in.</h1>
                <p className="auth-intro">{session.user.name} · {session.user.email}</p>
                <button className="auth-submit" onClick={() => router.push(destination())}>Continue learning <ArrowRight size={18} /></button>
                <button className="auth-page-switch" onClick={async () => { await authClient.signOut(); router.push("/login"); }}>Log out</button>
              </>
            ) : (
              <>
                <h1>{signup ? "Let’s get started." : "Welcome back."}</h1>
                <p className="auth-intro">{signup ? "Create an account and keep your progress in one place." : "Pick up right where you left off."}</p>
                <form className="auth-page-form" onSubmit={submit}>
                  {signup && <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" placeholder="Your name" /></label>}
                  <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" placeholder="you@example.com" /></label>
                  <label>Password
                    <span className="auth-password-field">
                      <input type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={signup ? "new-password" : "current-password"} placeholder={signup ? "At least 8 characters" : "Enter your password"} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={19} /> : <Eye size={19} />}</button>
                    </span>
                  </label>
                  {error && <p className="auth-page-error" role="alert">{error}</p>}
                  <button className="auth-submit" disabled={busy} type="submit"><span>{busy ? "Please wait..." : signup ? "Create account" : "Log in"}</span><ArrowRight size={18} /></button>
                </form>
                <p className="auth-page-footer">{signup ? "Already have an account?" : "New to Matty?"} <button onClick={switchPage}>{signup ? "Log in" : "Create an account"}</button></p>
              </>
            )}
          </div>
        </section>
        <aside className="auth-art" aria-label="Grade 10 mathematics">
          <div className="auth-art-top"><span><BookOpen size={16} /> MATHEMATICS</span><span>01 — 08</span></div>
          <div className="auth-art-stage"><span className="auth-art-orb" /><AuthVisual /><span className="auth-floating auth-floating-one">x² + y²</span><span className="auth-floating auth-floating-two">∑</span><span className="auth-floating auth-floating-three"><Sparkles size={19} /></span></div>
          <div className="auth-art-copy"><span className="auth-art-tag"><Check size={14} /> YOUR PROGRESS, YOUR PACE</span><h2>Every step<br />adds up.</h2><p>Learn, practise, and build confidence in maths.</p></div>
          <div className="auth-art-bottom"><span>MADE FOR CURIOUS MINDS</span><span>✦</span></div>
        </aside>
      </div>
    </main>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function AccountDialog({ onClose }: { onClose: () => void }) {
  const { data: session } = authClient.useSession();
  const [signup, setSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const result = signup
        ? await authClient.signUp.email({ name, email, password })
        : await authClient.signIn.email({ email, password });
      if (result.error) setError(result.error.message || "Could not log in.");
      else onClose();
    } catch {
      setError("Could not connect. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="account-backdrop" onClick={onClose}>
      <section className="account-dialog" role="dialog" aria-modal="true" aria-labelledby="account-title" onClick={(event) => event.stopPropagation()}>
        <button className="account-close" aria-label="Close account" onClick={onClose}><X size={21} /></button>
        {session ? (
          <><h2 id="account-title">{session.user.name}</h2><p>{session.user.email}</p><button className="primary-button" onClick={async () => { await authClient.signOut(); onClose(); }}>Log out</button></>
        ) : (
          <>
            <h2 id="account-title">{signup ? "Create account" : "Log in"}</h2>
            <form className="auth-form" onSubmit={submit}>
              {signup && <label>Name<input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" /></label>}
              <label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required autoComplete="email" /></label>
              <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength={8} autoComplete={signup ? "new-password" : "current-password"} /></label>
              {error && <p className="auth-error" role="alert">{error}</p>}
              <button className="primary-button" disabled={busy} type="submit">{busy ? "Please wait..." : signup ? "Create account" : "Log in"}</button>
            </form>
            <button className="auth-switch" onClick={() => { setSignup(!signup); setError(""); }}>{signup ? "Already have an account? Log in" : "New here? Create an account"}</button>
          </>
        )}
      </section>
    </div>
  );
}

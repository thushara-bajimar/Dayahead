"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("Demo UI only — no account was signed in.");
  }

  return (
    <>
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <Link href="/" className="text-xl font-bold text-green-800">
          Dayahead
        </Link>
        <nav className="flex flex-wrap gap-6 text-gray-600">
          <Link href="/">Dashboard</Link>
          <Link href="/tasks">My Tasks</Link>
          <Link href="/login" aria-current="page">Login</Link>
          <Link href="/register">Register</Link>
        </nav>
      </header>

      <main className="flex min-h-screen items-start justify-center bg-stone-50 px-4 py-12 sm:py-16">
        <section className="w-full max-w-md rounded-xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-3xl font-bold text-stone-800">Welcome back</h1>
          <p className="mt-2 text-stone-500">Log in to your Dayahead account.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-stone-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-stone-300 p-3"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-stone-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-stone-300 p-3"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-green-800 px-4 py-3 font-medium text-white hover:bg-green-900"
            >
              Log In
            </button>
          </form>

          {successMessage && (
            <p role="status" className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-800">
              {successMessage}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-stone-600">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-green-800 hover:underline">
              Register
            </Link>
          </p>
          <p className="mt-3 text-center text-sm">
            <Link href="/" className="text-green-800 hover:underline">
              Return to Dashboard
            </Link>
          </p>
        </section>
      </main>
    </>
  );
}

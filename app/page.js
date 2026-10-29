import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h2 className="text-xl font-bold text-green-800">Dayahead</h2>

        <nav className="flex gap-6 text-gray-600">
          <Link href="/">Dashboard</Link>
          <Link href="/tasks">My Tasks</Link>
          <Link href="/login">Login</Link>
        </nav>
      </header>
      <main className="min-h-screen bg-stone-50 p-8">
        <h1 className="text-3xl font-bold text-green-800">Dayahead</h1>
        <p className="mt-2 text-gray-600">Plan today. Prepare for tomorrow.</p>
      </main>
    </>
  );
}

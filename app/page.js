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
        <section className="py-10">
          <h1 className="text-3xl font-bold text-stone-800">
            Good morning!
          </h1>

          <p className="mt-2 text-stone-500">
            Plan your day, one task at a time.
          </p>
        </section>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Total Tasks</p>
            <h2 className="mt-2 text-3xl font-bold">8</h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Completed</p>
            <h2 className="mt-2 text-3xl font-bold text-green-700">3</h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">Pending</p>
            <h2 className="mt-2 text-3xl font-bold text-amber-600">5</h2>
          </div>
        </section>
      </main>
    </>
  );
}

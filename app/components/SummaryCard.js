export default function SummaryCard({ title, value, valueClassName = "text-stone-800" }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <p className="text-sm text-stone-500">{title}</p>
      <h2 className={`mt-2 text-3xl font-bold ${valueClassName}`}>{value}</h2>
    </div>
  );
}

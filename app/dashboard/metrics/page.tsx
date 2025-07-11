// app/dashboard/metrics/page.tsx

export default function MetricsPage() {
  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 Portfolio Metrics</h1>

      <div className="rounded-lg overflow-hidden shadow-md border bg-white">
        <iframe
          src="https://us.posthog.com/shared/wG1VKAwZJ8AZH4zFpViVvC8qszYGJg"
          width="100%"
          height="800"
          style={{ border: "none" }}
          allowFullScreen
        />
      </div>
    </div>
  );
}

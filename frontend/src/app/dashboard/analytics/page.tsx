export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Analytics</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-secondary-dark p-6 rounded-lg h-64 flex items-center justify-center">
          <p className="text-text-light">Gráfico de conversiones</p>
        </div>
        <div className="bg-secondary-dark p-6 rounded-lg h-64 flex items-center justify-center">
          <p className="text-text-light">Gráfico de leads por mes</p>
        </div>
      </div>
    </div>
  )
}

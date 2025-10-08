import StatsCard from '@/components/dashboard/StatsCard'
import LeadsTable from '@/components/dashboard/LeadsTable'
import { FaBuilding, FaChartLine, FaRobot, FaEnvelope } from 'react-icons/fa'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Bienvenido al Dashboard</h1>
        <p className="text-text-light">Resumen de tus operaciones</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Leads" value="156" icon={FaBuilding} trend="+12% este mes" />
        <StatsCard title="Conversiones" value="42" icon={FaChartLine} trend="+8% este mes" />
        <StatsCard title="Agentes Activos" value="7" icon={FaRobot} />
        <StatsCard title="Mensajes" value="89" icon={FaEnvelope} trend="+15% este mes" />
      </div>

      <LeadsTable />
    </div>
  )
}

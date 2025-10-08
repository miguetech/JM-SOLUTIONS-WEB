import { FaRobot } from 'react-icons/fa'

const agents = [
  { name: 'Database Search Agent', status: 'Activo', tasks: 45 },
  { name: 'Lead Qualification Agent', status: 'Activo', tasks: 32 },
  { name: 'Outreach Agent', status: 'Inactivo', tasks: 0 },
]

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Agentes IA</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {agents.map((agent, index) => (
          <div key={index} className="bg-secondary-dark p-6 rounded-lg">
            <FaRobot className="text-4xl text-accent-blue mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{agent.name}</h3>
            <p className="text-text-light mb-2">Estado: {agent.status}</p>
            <p className="text-text-light">Tareas: {agent.tasks}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

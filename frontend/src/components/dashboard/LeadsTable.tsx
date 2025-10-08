'use client'

interface Lead {
  id: number
  name: string
  email: string
  status: string
  score: number
}

const mockLeads: Lead[] = [
  { id: 1, name: 'Empresa ABC', email: 'contact@abc.com', status: 'Nuevo', score: 85 },
  { id: 2, name: 'Tech Solutions', email: 'info@tech.com', status: 'Contactado', score: 72 },
  { id: 3, name: 'Digital Corp', email: 'hello@digital.com', status: 'Calificado', score: 90 },
]

export default function LeadsTable() {
  return (
    <div className="bg-secondary-dark rounded-lg overflow-hidden">
      <div className="p-6 border-b border-background-dark">
        <h2 className="text-xl font-bold text-white">Leads Recientes</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-background-dark">
            <tr>
              <th className="px-6 py-3 text-left text-text-light">Nombre</th>
              <th className="px-6 py-3 text-left text-text-light">Email</th>
              <th className="px-6 py-3 text-left text-text-light">Estado</th>
              <th className="px-6 py-3 text-left text-text-light">Score</th>
            </tr>
          </thead>
          <tbody>
            {mockLeads.map((lead) => (
              <tr key={lead.id} className="border-b border-background-dark hover:bg-background-dark/50">
                <td className="px-6 py-4 text-white">{lead.name}</td>
                <td className="px-6 py-4 text-text-light">{lead.email}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-accent-blue/20 text-accent-blue rounded-full text-sm">
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-white font-bold">{lead.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

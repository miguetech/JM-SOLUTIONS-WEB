import LeadsTable from '@/components/dashboard/LeadsTable'

export default function LeadsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Gestión de Leads</h1>
        <button className="bg-accent-blue text-background-dark px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark hover:text-white transition">
          + Nuevo Lead
        </button>
      </div>
      <LeadsTable />
    </div>
  )
}

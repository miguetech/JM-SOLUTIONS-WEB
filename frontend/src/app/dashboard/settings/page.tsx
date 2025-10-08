export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Configuración</h1>

      <div className="bg-secondary-dark p-6 rounded-lg">
        <h2 className="text-xl font-bold text-white mb-4">Perfil</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-text-light mb-2">Nombre</label>
            <input
              type="text"
              defaultValue="Admin"
              className="w-full px-4 py-2 bg-background-dark text-white rounded-lg border border-secondary-dark"
            />
          </div>
          <div>
            <label className="block text-text-light mb-2">Email</label>
            <input
              type="email"
              defaultValue="admin@jmsolutions.com"
              className="w-full px-4 py-2 bg-background-dark text-white rounded-lg border border-secondary-dark"
            />
          </div>
          <button className="bg-accent-blue text-background-dark px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark hover:text-white transition">
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  )
}

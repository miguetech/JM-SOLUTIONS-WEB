import { FaSearch, FaCogs, FaCode, FaRobot, FaCloud } from 'react-icons/fa'

const services = [
  {
    icon: FaSearch,
    title: 'Auditoría Digital',
    description: 'Análisis profundo de presencia web, SEO, seguridad y oportunidades de mejora'
  },
  {
    icon: FaCogs,
    title: 'Automatizaciones',
    description: 'Flujos de trabajo inteligentes que reducen tareas manuales y aumentan eficiencia'
  },
  {
    icon: FaCode,
    title: 'Desarrollo Web',
    description: 'Sitios y aplicaciones optimizadas para conversión y experiencia de usuario'
  },
  {
    icon: FaRobot,
    title: 'Agentes IA',
    description: 'Asistentes inteligentes personalizados para atención al cliente y procesos internos'
  },
  {
    icon: FaCloud,
    title: 'Software as a Service',
    description: 'Plataformas especializadas para gestión de leads y análisis de mercado'
  }
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Nuestros Servicios
        </h2>
        <p className="text-center text-text-light mb-16 text-lg">
          Soluciones digitales que transforman tu negocio
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-background-dark p-8 rounded-lg hover:border-2 hover:border-accent-blue transition"
            >
              <service.icon className="text-5xl text-accent-blue mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-text-light">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { FaChartLine, FaBrain, FaEye, FaGraduationCap } from 'react-icons/fa'

const benefits = [
  {
    icon: FaChartLine,
    title: 'Resultados Medibles',
    description: 'Enfoque en ROI y métricas concretas para tu negocio'
  },
  {
    icon: FaBrain,
    title: 'Automatización Inteligente',
    description: 'IA como ventaja competitiva en tus procesos'
  },
  {
    icon: FaEye,
    title: 'Transparencia Total',
    description: 'Acceso completo a métricas y reportes en tiempo real'
  },
  {
    icon: FaGraduationCap,
    title: 'Educación Continua',
    description: 'Contenido educativo sobre cada servicio implementado'
  }
]

export default function Benefits() {
  return (
    <section id="beneficios" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-blue/10 rounded-full mb-4">
                <benefit.icon className="text-4xl text-accent-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-text-light">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

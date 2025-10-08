import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-background-dark border-t border-secondary-dark py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-accent-blue mb-4">JM Solutions</h3>
            <p className="text-text-light">Work smart, not harder</p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li><a href="#servicios" className="text-text-light hover:text-accent-blue transition">Servicios</a></li>
              <li><a href="#beneficios" className="text-text-light hover:text-accent-blue transition">Beneficios</a></li>
              <li><a href="#contacto" className="text-text-light hover:text-accent-blue transition">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-text-light hover:text-accent-blue transition">
                <FaLinkedin className="text-2xl" />
              </a>
              <a href="#" className="text-text-light hover:text-accent-blue transition">
                <FaGithub className="text-2xl" />
              </a>
              <a href="#" className="text-text-light hover:text-accent-blue transition">
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-dark pt-8 text-center text-text-light">
          <p>&copy; 2024 JM Solutions. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

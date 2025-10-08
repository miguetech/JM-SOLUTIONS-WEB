'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-background-dark/95 backdrop-blur-sm z-50 border-b border-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-accent-blue font-exo">
            JM Solutions
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link href="#servicios" className="text-text-light hover:text-accent-blue transition">
              Servicios
            </Link>
            <Link href="#beneficios" className="text-text-light hover:text-accent-blue transition">
              Beneficios
            </Link>
            <Link href="#contacto" className="text-text-light hover:text-accent-blue transition">
              Contacto
            </Link>
          </div>

          <Link 
            href="/login" 
            className="bg-accent-blue text-background-dark px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark hover:text-white transition"
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </nav>
  )
}

'use client'

import { useState } from 'react'
import { api } from '@/lib/api'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('Enviando...')
    
    const result = await api.post('/contact', formData)
    if (result.success) {
      setStatus('¡Mensaje enviado! Te contactaremos pronto.')
      setFormData({ name: '', email: '', message: '' })
    } else {
      setStatus('Error al enviar mensaje')
    }
  }

  return (
    <section id="contacto" className="py-20 bg-secondary-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4">
          Hablemos de tu proyecto
        </h2>
        <p className="text-center text-text-light mb-12 text-lg">
          Cuéntanos cómo podemos ayudarte a crecer
        </p>

        {status && (
          <div className={`p-4 rounded-lg mb-6 text-center ${
            status.includes('Error') ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
          }`}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-background-dark text-white rounded-lg border border-secondary-dark focus:border-accent-blue outline-none"
              required
            />
          </div>
          
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-background-dark text-white rounded-lg border border-secondary-dark focus:border-accent-blue outline-none"
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Mensaje"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-background-dark text-white rounded-lg border border-secondary-dark focus:border-accent-blue outline-none resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent-blue text-background-dark py-4 rounded-lg font-bold text-lg hover:bg-primary-dark hover:text-white transition"
          >
            Enviar Mensaje
          </button>
        </form>
      </div>
    </section>
  )
}

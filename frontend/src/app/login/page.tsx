'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const result = await login(email, password)
    if (result.success) {
      router.push('/dashboard')
    } else {
      setError(result.error || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-secondary-dark p-8 rounded-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-6 text-center">Iniciar Sesión</h1>
        
        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text-light mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-background-dark text-white rounded-lg border border-secondary-dark focus:border-accent-blue outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-text-light mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-background-dark text-white rounded-lg border border-secondary-dark focus:border-accent-blue outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent-blue text-background-dark py-3 rounded-lg font-bold hover:bg-primary-dark hover:text-white transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-text-light mt-6">
          <Link href="/" className="text-accent-blue hover:underline">
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  )
}

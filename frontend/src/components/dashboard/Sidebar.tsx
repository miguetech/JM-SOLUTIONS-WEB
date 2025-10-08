'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { FaHome, FaBuilding, FaChartLine, FaRobot, FaCog, FaSignOutAlt } from 'react-icons/fa'

const menuItems = [
  { icon: FaHome, label: 'Dashboard', href: '/dashboard' },
  { icon: FaBuilding, label: 'Leads', href: '/dashboard/leads' },
  { icon: FaChartLine, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: FaRobot, label: 'Agentes IA', href: '/dashboard/agents' },
  { icon: FaCog, label: 'Configuración', href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()

  return (
    <aside className="w-64 bg-secondary-dark h-screen fixed left-0 top-0 p-6 flex flex-col">
      <Link href="/" className="text-2xl font-bold text-accent-blue mb-8 block">
        JM Solutions
      </Link>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
              pathname === item.href
                ? 'bg-accent-blue text-background-dark'
                : 'text-text-light hover:bg-background-dark'
            }`}
          >
            <item.icon className="text-xl" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center space-x-3 px-4 py-3 rounded-lg text-text-light hover:bg-background-dark transition mt-4"
      >
        <FaSignOutAlt className="text-xl" />
        <span>Cerrar Sesión</span>
      </button>
    </aside>
  )
}

'use client'

import { FaBell, FaUser } from 'react-icons/fa'

export default function Header() {
  return (
    <header className="bg-secondary-dark h-16 fixed top-0 right-0 left-64 flex items-center justify-between px-8 z-10">
      <h1 className="text-xl font-bold text-white">Dashboard</h1>
      
      <div className="flex items-center space-x-4">
        <button className="text-text-light hover:text-accent-blue transition">
          <FaBell className="text-xl" />
        </button>
        <button className="flex items-center space-x-2 text-text-light hover:text-accent-blue transition">
          <FaUser className="text-xl" />
          <span>Admin</span>
        </button>
      </div>
    </header>
  )
}

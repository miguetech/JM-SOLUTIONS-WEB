import { IconType } from 'react-icons'

interface StatsCardProps {
  title: string
  value: string | number
  icon: IconType
  trend?: string
}

export default function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-secondary-dark p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-light">{title}</h3>
        <Icon className="text-2xl text-accent-blue" />
      </div>
      <p className="text-3xl font-bold text-white mb-2">{value}</p>
      {trend && <p className="text-sm text-green-400">{trend}</p>}
    </div>
  )
}

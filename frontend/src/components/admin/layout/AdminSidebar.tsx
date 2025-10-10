'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard,
  Bot,
  Database,
  Settings,
  Activity,
  FileText,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const navigation = [
  {
    name: 'Overview',
    href: '/admin/overview',
    icon: LayoutDashboard,
    description: 'Panel principal'
  },
  {
    name: 'Scraper',
    href: '/admin/scraper',
    icon: Activity,
    description: 'Control de scraping'
  },
  {
    name: 'IA Agents',
    href: '/admin/ia-agents',
    icon: Bot,
    description: 'Agentes autónomos'
  },
  {
    name: 'Database',
    href: '/admin/database',
    icon: Database,
    description: 'Explorador de datos'
  },
  {
    name: 'Logs',
    href: '/admin/logs',
    icon: FileText,
    description: 'Logs del sistema'
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Configuración'
  },
];

export function AdminSidebar({ open, onOpenChange }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col bg-secondary-dark border-r border-gray-700">
          {/* Logo */}
          <div className="flex h-16 flex-shrink-0 items-center px-4 border-b border-gray-700">
            <h1 className="text-xl font-exo font-bold text-accent-blue">
              JM Solutions
            </h1>
            <span className="ml-2 text-xs bg-primary-dark text-white px-2 py-1 rounded">
              ADMIN
            </span>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    isActive
                      ? 'bg-accent-blue text-white'
                      : 'text-text-light hover:bg-gray-700 hover:text-white'
                  )}
                >
                  <item.icon
                    className={cn(
                      'mr-3 h-5 w-5 flex-shrink-0',
                      isActive ? 'text-white' : 'text-gray-400'
                    )}
                  />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-xs text-gray-400">{item.description}</div>
                  </div>
                </Link>
              );
            })}
          </nav>
          
          {/* Footer */}
          <div className="flex-shrink-0 flex border-t border-gray-700 p-4">
            <div className="text-xs text-gray-400">
              <div className="font-medium text-text-light">Admin Dashboard</div>
              <div>v1.0.0</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        'fixed inset-0 flex z-50 lg:hidden',
        open ? 'block' : 'hidden'
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-secondary-dark">
          {/* Close Button */}
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center px-4 h-16 border-b border-gray-700">
            <h1 className="text-xl font-exo font-bold text-accent-blue">
              JM Solutions
            </h1>
            <span className="ml-2 text-xs bg-primary-dark text-white px-2 py-1 rounded">
              ADMIN
            </span>
          </div>
          
          {/* Navigation */}
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => onOpenChange(false)}
                    className={cn(
                      'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-accent-blue text-white'
                        : 'text-text-light hover:bg-gray-700 hover:text-white'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0',
                        isActive ? 'text-white' : 'text-gray-400'
                      )}
                    />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-400">{item.description}</div>
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
'use client';

import { Menu, Bell, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

export function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  return (
    <header className="bg-secondary-dark border-b border-gray-700 lg:border-l">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="sm"
          className="lg:hidden text-text-light hover:text-white"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Breadcrumb o título */}
        <div className="flex-1 lg:flex lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            {/* Aquí puedes agregar breadcrumbs si es necesario */}
          </div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative text-text-light hover:text-white">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                3
              </span>
            </Button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-3">
              <div className="text-right text-sm">
                <div className="font-medium text-white">Admin User</div>
                <div className="text-text-light">Super Admin</div>
              </div>
              
              <Button variant="ghost" size="sm" className="text-text-light hover:text-white">
                <User className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-400 hover:text-red-300"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
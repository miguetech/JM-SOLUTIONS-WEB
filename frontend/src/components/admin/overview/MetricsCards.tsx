'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Database, 
  Bot, 
  Activity, 
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { adminService, type DashboardMetrics } from '@/services/admin.service';

export function MetricsCards() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const data = await adminService.getDashboardMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching metrics:', err);
        setError('Error al cargar métricas');
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchMetrics, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-700 rounded w-1/2 mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-400">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-2 text-accent-blue hover:underline"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (!metrics) return null;

  const metricsConfig = [
    {
      title: 'Total Empresas',
      value: (metrics.totalCompanies || 0).toLocaleString(),
      change: `+${metrics.leadsToday || 0} hoy`,
      icon: Database,
      color: 'text-accent-blue',
    },
    {
      title: 'Leads Calificados',
      value: (metrics.highOpportunities || 0).toLocaleString(),
      change: `+${metrics.leadsToday || 0} hoy`,
      icon: TrendingUp,
      color: 'text-green-400',
    },
    {
      title: 'Sesiones Scraper',
      value: (metrics.scrapeSessionsToday || 0).toString(),
      change: 'Hoy',
      icon: Activity,
      color: 'text-purple-400',
    },
    {
      title: 'Scraper Status',
      value: 'Activo',
      change: 'Operativo',
      icon: Activity,
      color: 'text-green-400',
    },
    {
      title: 'Reuniones Programadas',
      value: (metrics.meetingsThisWeek || 0).toString(),
      change: 'Esta semana',
      icon: Users,
      color: 'text-blue-400',
    },
    {
      title: 'Ingresos Estimados',
      value: `$${(metrics.revenueThisMonth || 0).toLocaleString()}`,
      change: 'Este mes',
      icon: DollarSign,
      color: 'text-yellow-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricsConfig.map((metric, index) => {
        const IconComponent = metric.icon;
        return (
          <Card key={index} className="hover:border-accent-blue/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-text-light">
                {metric.title}
              </CardTitle>
              <IconComponent className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-exo font-bold text-white mb-1">
                {metric.value}
              </div>
              <p className="text-xs text-text-light">
                {metric.change}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
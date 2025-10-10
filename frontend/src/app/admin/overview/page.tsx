import { MetricsCards } from '@/components/admin/overview/MetricsCards';
import { PerformanceCharts } from '@/components/admin/overview/PerformanceCharts';
import { RecentActivity } from '@/components/admin/overview/RecentActivity';

export default function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-exo font-bold text-white">
          Dashboard Overview
        </h1>
        <p className="text-text-light mt-2">
          Monitoreo en tiempo real de todos los microservicios
        </p>
      </div>
      
      <MetricsCards />
      <PerformanceCharts />
      <RecentActivity />
    </div>
  );
}
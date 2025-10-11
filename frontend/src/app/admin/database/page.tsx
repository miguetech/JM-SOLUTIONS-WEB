import { CompaniesTable, OpportunitiesView, AnalyticsCharts } from '@/components/admin/database';

export default function DatabasePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-exo font-bold text-white">
          Database Explorer
        </h1>
        <p className="text-text-light mt-2">
          Exploración y análisis de datos de empresas y oportunidades
        </p>
      </div>
      
      <AnalyticsCharts />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OpportunitiesView />
        <div className="lg:col-span-2">
          <CompaniesTable />
        </div>
      </div>
    </div>
  );
}
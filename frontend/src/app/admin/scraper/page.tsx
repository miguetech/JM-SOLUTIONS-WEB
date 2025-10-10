import { ScraperControls } from '@/components/admin/scraper/ScraperControls';
import { SessionMonitor } from '@/components/admin/scraper/SessionMonitor';
import { ConfigurationPanel } from '@/components/admin/scraper/ConfigurationPanel';

export default function ScraperPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-exo font-bold text-white">
          Scraper Management
        </h1>
        <p className="text-text-light mt-2">
          Control y monitoreo del sistema de generación de leads
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScraperControls />
        <SessionMonitor />
      </div>
      
      <ConfigurationPanel />
    </div>
  );
}
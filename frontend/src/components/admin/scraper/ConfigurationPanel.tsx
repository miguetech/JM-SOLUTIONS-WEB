'use client';

import { Card } from '@/components/ui/card';

export function ConfigurationPanel() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Configuración</h2>
      <div className="text-sm text-gray-400">
        <p>Panel de configuración del scraper</p>
      </div>
    </Card>
  );
}

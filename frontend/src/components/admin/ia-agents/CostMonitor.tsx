'use client';

import { Card } from '@/components/ui/card';

export function CostMonitor() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Monitor de Costos</h2>
      <div className="text-sm text-gray-400">
        <p>Costo total: $0.00</p>
      </div>
    </Card>
  );
}

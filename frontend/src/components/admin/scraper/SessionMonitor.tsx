'use client';

import { Card } from '@/components/ui/card';

export function SessionMonitor() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Monitor de Sesión</h2>
      <div className="text-sm text-gray-400">
        <p>Estado: Inactivo</p>
      </div>
    </Card>
  );
}

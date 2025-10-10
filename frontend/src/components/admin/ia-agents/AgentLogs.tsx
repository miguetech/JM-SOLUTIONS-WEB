'use client';

import { Card } from '@/components/ui/card';

export function AgentLogs() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Logs de Agentes</h2>
      <div className="text-sm text-gray-400">
        <p>Sin logs recientes</p>
      </div>
    </Card>
  );
}

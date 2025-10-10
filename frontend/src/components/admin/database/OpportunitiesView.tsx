'use client';

import { Card } from '@/components/ui/card';

export function OpportunitiesView() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Oportunidades</h2>
      <div className="text-sm text-gray-400">
        <p>No hay oportunidades disponibles</p>
      </div>
    </Card>
  );
}

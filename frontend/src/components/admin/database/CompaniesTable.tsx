'use client';

import { Card } from '@/components/ui/card';

export function CompaniesTable() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold mb-4">Empresas</h2>
      <div className="text-sm text-gray-400">
        <p>No hay empresas registradas</p>
      </div>
    </Card>
  );
}

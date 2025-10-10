'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { adminService, type LeadTrend, type NicheData } from '@/services/admin.service';

export function PerformanceCharts() {
  const [trends, setTrends] = useState<LeadTrend[]>([]);
  const [nicheData, setNicheData] = useState<NicheData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [trendsData, nicheDataResponse] = await Promise.all([
          adminService.getLeadTrends(),
          adminService.getLeadsByNiche()
        ]);
        
        setTrends(Array.isArray(trendsData) ? trendsData : []);
        setNicheData(Array.isArray(nicheDataResponse) ? nicheDataResponse : []);
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setTrends([]);
        setNicheData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Refresh every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-700 rounded"></div>
          </CardContent>
        </Card>
        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 bg-gray-700 rounded w-1/2"></div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] bg-gray-700 rounded"></div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Lead Generation Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Generación de Leads - Últimos 7 Días</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
              <XAxis 
                dataKey="date" 
                stroke="#B0BEC5"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => new Date(value).getDate().toString()}
              />
              <YAxis stroke="#B0BEC5" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#424242', 
                  border: '1px solid #666', 
                  borderRadius: '8px',
                  color: '#B0BEC5'
                }}
                labelFormatter={(value) => `Fecha: ${new Date(value).toLocaleDateString()}`}
              />
              <Line 
                type="monotone" 
                dataKey="leads" 
                stroke="#00BFFF" 
                strokeWidth={2}
                dot={{ fill: '#00BFFF', strokeWidth: 2, r: 4 }}
                name="Leads Generados"
              />
              <Line 
                type="monotone" 
                dataKey="conversions" 
                stroke="#0D47A1" 
                strokeWidth={2}
                dot={{ fill: '#0D47A1', strokeWidth: 2, r: 4 }}
                name="Conversiones"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Leads by Niche */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Leads por Nicho</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={nicheData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#424242" />
              <XAxis 
                dataKey="niche" 
                stroke="#B0BEC5"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis stroke="#B0BEC5" tick={{ fontSize: 12 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#424242', 
                  border: '1px solid #666', 
                  borderRadius: '8px',
                  color: '#B0BEC5'
                }}
                formatter={(value, name) => [
                  `${value}${name === 'avg_score' ? ' pts' : ''}`, 
                  name === 'leads' ? 'Leads' : 'Score Promedio'
                ]}
              />
              <Bar dataKey="leads" fill="#00BFFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
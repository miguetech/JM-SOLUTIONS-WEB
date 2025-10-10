'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Play, 
  Square, 
  Settings, 
  Activity,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { scraperService, type ScraperStatus } from '@/services/scraper.service';

export function ScraperControls() {
  const [status, setStatus] = useState<ScraperStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    searches_per_minute: 10,
    max_results_per_search: 20,
    location: 'Madrid, España',
    radius: 5000,
    categories: [] as string[],
    auto_mode: false,
    search_query: ''
  });

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const statusData = await scraperService.getStatus();
      setStatus(statusData);
    } catch (error) {
      console.error('Error fetching scraper status:', error);
    }
  };

  const handleStart = async () => {
    setLoading(true);
    try {
      console.log('Starting scraper with config:', config);
      const result = await scraperService.start(config);
      console.log('Scraper start result:', result);
      alert(`Scraper: ${result.message}`);
      await fetchStatus();
    } catch (error) {
      console.error('Error starting scraper:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    try {
      await scraperService.stop();
      await fetchStatus();
    } catch (error) {
      console.error('Error stopping scraper:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="h-4 w-4" />;
      case 'stopped': return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Estado del Scraper
            </span>
            <Badge 
              variant="secondary" 
              className={`${getStatusColor(status?.status)} text-white`}
            >
              <span className="flex items-center gap-1">
                {getStatusIcon(status?.status)}
                {status?.status || 'Desconocido'}
              </span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-light">Búsquedas completadas</p>
              <p className="text-xl font-bold text-white">{status?.searches_completed || 0}</p>
            </div>
            <div>
              <p className="text-text-light">Empresas encontradas</p>
              <p className="text-xl font-bold text-white">{status?.companies_found || 0}</p>
            </div>
            <div>
              <p className="text-text-light">Última actividad</p>
              <p className="text-white">{status?.last_activity || 'N/A'}</p>
            </div>
            <div>
              <p className="text-text-light">Tiempo activo</p>
              <p className="text-white">{status?.uptime || 'N/A'}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Controls Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Controles y Configuración
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleStart}
              disabled={loading || status?.status === 'running'}
              className="flex-1"
            >
              <Play className="h-4 w-4 mr-2" />
              Iniciar Scraping
            </Button>
            <Button 
              variant="outline"
              onClick={handleStop}
              disabled={loading || status?.status === 'stopped'}
              className="flex-1"
            >
              <Square className="h-4 w-4 mr-2" />
              Detener
            </Button>
          </div>

          {/* Configuration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={config.location}
                onChange={(e) => setConfig({...config, location: e.target.value})}
                placeholder="Madrid, España"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="radius">Radio (metros)</Label>
              <Input
                id="radius"
                type="number"
                value={config.radius}
                onChange={(e) => setConfig({...config, radius: parseInt(e.target.value)})}
                placeholder="5000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="searches_per_minute">Búsquedas por minuto</Label>
              <Input
                id="searches_per_minute"
                type="number"
                value={config.searches_per_minute}
                onChange={(e) => setConfig({...config, searches_per_minute: parseInt(e.target.value)})}
                min="1"
                max="60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="max_results">Resultados por búsqueda</Label>
              <Input
                id="max_results"
                type="number"
                value={config.max_results_per_search}
                onChange={(e) => setConfig({...config, max_results_per_search: parseInt(e.target.value)})}
                min="10"
                max="100"
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="search_query">Consulta de búsqueda</Label>
              <Input
                id="search_query"
                value={config.search_query}
                onChange={(e) => setConfig({...config, search_query: e.target.value})}
                placeholder="restaurantes, talleres, tiendas..."
              />
            </div>

            <div className="flex items-center space-x-2 md:col-span-2">
              <Switch
                id="auto_mode"
                checked={config.auto_mode}
                onCheckedChange={(checked) => setConfig({...config, auto_mode: checked})}
              />
              <Label htmlFor="auto_mode">Modo automático</Label>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

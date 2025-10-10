'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bot, 
  Play, 
  Square, 
  RefreshCw, 
  AlertCircle,
  CheckCircle,
  Activity
} from 'lucide-react';
import { iaService, type AgentStatus } from '@/services/ia.service';

export function AgentsStatus() {
  const [agents, setAgents] = useState<AgentStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    status: 'stopped' as 'running' | 'stopped' | 'paused',
    active_agents: 0,
    total_tasks: 0,
    uptime: ''
  });

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const fetchStatus = async () => {
    try {
      const statusData = await iaService.getAgentsStatus();
      setAgents(statusData.agents || []);
      setSystemStatus(statusData.system || systemStatus);
    } catch (error) {
      console.error('Error fetching IA agents status:', error);
    }
  };

  const handleSystemControl = async (action: 'start' | 'stop' | 'restart') => {
    setLoading(true);
    try {
      let response;
      switch (action) {
        case 'start':
          response = await iaService.startSystem();
          break;
        case 'stop':
          response = await iaService.stopSystem();
          break;
        case 'restart':
          response = await iaService.restartSystem();
          break;
      }
      
      if (response.success) {
        await fetchStatus();
      }
    } catch (error) {
      console.error(`Error ${action} IA system:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleAgentToggle = async (agentId: string, enabled: boolean) => {
    try {
      await iaService.toggleAgent(agentId, enabled);
      await fetchStatus();
    } catch (error) {
      console.error('Error toggling agent:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-green-500';
      case 'stopped': return 'bg-red-500';
      case 'paused': return 'bg-yellow-500';
      case 'error': return 'bg-red-600';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="h-4 w-4" />;
      case 'stopped': return <AlertCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Sistema IA
            </span>
            <Badge 
              variant="secondary" 
              className={`${getStatusColor(systemStatus.status)} text-white`}
            >
              <span className="flex items-center gap-1">
                {getStatusIcon(systemStatus.status)}
                {systemStatus.status}
              </span>
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-text-light">Agentes activos</p>
              <p className="text-xl font-bold text-white">{systemStatus.active_agents}</p>
            </div>
            <div>
              <p className="text-text-light">Tareas totales</p>
              <p className="text-xl font-bold text-white">{systemStatus.total_tasks}</p>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm"
              onClick={() => handleSystemControl('start')}
              disabled={loading || systemStatus.status === 'running'}
            >
              <Play className="h-4 w-4 mr-1" />
              Iniciar
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={() => handleSystemControl('stop')}
              disabled={loading || systemStatus.status === 'stopped'}
            >
              <Square className="h-4 w-4 mr-1" />
              Detener
            </Button>
            <Button 
              size="sm"
              variant="outline"
              onClick={() => handleSystemControl('restart')}
              disabled={loading}
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Reiniciar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Agents */}
      <Card>
        <CardHeader>
          <CardTitle>Agentes Individuales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.length === 0 ? (
              <p className="text-text-light text-center py-4">
                No hay agentes configurados
              </p>
            ) : (
              agents.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 border border-secondary-dark rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bot className="h-4 w-4 text-accent-blue" />
                    <div>
                      <h4 className="font-medium text-white">{agent.name}</h4>
                      <p className="text-sm text-text-light">{agent.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right text-sm">
                      <p className="text-text-light">Tareas: {agent.tasks_completed}</p>
                      <p className="text-text-light">Costo: ${agent.cost_today}</p>
                    </div>
                    
                    <Badge variant="secondary" className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={agent.enabled}
                        onCheckedChange={(checked) => handleAgentToggle(agent.id, checked)}
                      />
                      <Label className="text-sm">Activo</Label>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

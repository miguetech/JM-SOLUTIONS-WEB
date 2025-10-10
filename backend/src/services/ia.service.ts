import axios from 'axios';

const IA_SERVICE_URL = process.env.IA_SERVICE_URL || 'http://localhost:8001';

interface AgentStatus {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  enabled: boolean;
  tasks_completed: number;
  cost_today: number;
  last_activity: string;
}

interface SystemStatus {
  status: 'running' | 'stopped' | 'paused';
  active_agents: number;
  total_tasks: number;
  uptime: string;
}

interface AgentsStatusResponse {
  system: SystemStatus;
  agents: AgentStatus[];
}

interface CostMetrics {
  today: number;
  week: number;
  month: number;
  total: number;
  breakdown: {
    model: string;
    cost: number;
    requests: number;
  }[];
}

interface AgentLog {
  id: string;
  agent_id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  data?: any;
}

class IAService {
  private async makeRequest(endpoint: string, options?: any) {
    try {
      const response = await axios({
        url: `${IA_SERVICE_URL}${endpoint}`,
        timeout: 10000,
        ...options,
      });
      return response.data;
    } catch (error) {
      console.error(`IA service error (${endpoint}):`, error);
      
      // Return mock data if service is not available
      if (endpoint === '/agents/status') {
        return {
          system: {
            status: 'stopped',
            active_agents: 0,
            total_tasks: 0,
            uptime: '0:00:00'
          },
          agents: [
            {
              id: 'lead-analyzer',
              name: 'Analizador de Leads',
              description: 'Analiza y califica leads automáticamente',
              status: 'stopped',
              enabled: false,
              tasks_completed: 0,
              cost_today: 0,
              last_activity: 'N/A'
            },
            {
              id: 'content-generator',
              name: 'Generador de Contenido',
              description: 'Genera contenido personalizado para outreach',
              status: 'stopped',
              enabled: false,
              tasks_completed: 0,
              cost_today: 0,
              last_activity: 'N/A'
            },
            {
              id: 'opportunity-scorer',
              name: 'Calificador de Oportunidades',
              description: 'Evalúa el potencial de cada oportunidad de negocio',
              status: 'stopped',
              enabled: false,
              tasks_completed: 0,
              cost_today: 0,
              last_activity: 'N/A'
            }
          ]
        };
      }
      
      throw error;
    }
  }

  async getAgentsStatus(): Promise<AgentsStatusResponse> {
    try {
      const response = await this.makeRequest('/agents/status');
      
      // Transform the response from the IA service
      if (response.agents && typeof response.agents === 'object') {
        const agentsArray = Object.entries(response.agents).map(([id, data]: [string, any]) => ({
          id,
          name: this.getAgentName(id),
          description: this.getAgentDescription(id),
          status: data.status === 'idle' ? 'stopped' : data.status,
          enabled: data.status !== 'idle',
          tasks_completed: data.tasks_completed || 0,
          cost_today: data.cost_today || 0,
          last_activity: data.last_activity || 'N/A'
        }));

        return {
          system: {
            status: agentsArray.some(a => a.status === 'running') ? 'running' : 'stopped',
            active_agents: agentsArray.filter(a => a.status === 'running').length,
            total_tasks: agentsArray.reduce((sum, a) => sum + a.tasks_completed, 0),
            uptime: '0:00:00'
          },
          agents: agentsArray
        };
      }

      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Error getting IA agents status:', error);
      return this.getMockAgentsStatus();
    }
  }

  private getAgentName(id: string): string {
    const names: Record<string, string> = {
      'database_search': 'Búsqueda en Base de Datos',
      'lead_qualification': 'Calificación de Leads',
      'outreach': 'Alcance y Contacto',
      'web_research': 'Investigación Web',
      'customer_service': 'Servicio al Cliente'
    };
    return names[id] || id;
  }

  private getAgentDescription(id: string): string {
    const descriptions: Record<string, string> = {
      'database_search': 'Busca y filtra información en la base de datos',
      'lead_qualification': 'Califica y prioriza leads automáticamente',
      'outreach': 'Gestiona campañas de alcance y seguimiento',
      'web_research': 'Investiga información en la web',
      'customer_service': 'Atiende consultas de clientes'
    };
    return descriptions[id] || 'Agente de IA';
  }

  private getMockAgentsStatus(): AgentsStatusResponse {
    return {
      system: {
        status: 'stopped',
        active_agents: 0,
        total_tasks: 0,
        uptime: '0:00:00'
      },
      agents: [
        {
          id: 'lead-analyzer',
          name: 'Analizador de Leads',
          description: 'Analiza y califica leads automáticamente',
          status: 'stopped',
          enabled: false,
          tasks_completed: 0,
          cost_today: 0,
          last_activity: 'N/A'
        },
        {
          id: 'content-generator',
          name: 'Generador de Contenido',
          description: 'Genera contenido personalizado para outreach',
          status: 'stopped',
          enabled: false,
          tasks_completed: 0,
          cost_today: 0,
          last_activity: 'N/A'
        },
        {
          id: 'opportunity-scorer',
          name: 'Calificador de Oportunidades',
          description: 'Evalúa el potencial de cada oportunidad de negocio',
          status: 'stopped',
          enabled: false,
          tasks_completed: 0,
          cost_today: 0,
          last_activity: 'N/A'
        }
      ]
    };
  }

  async getAgentsStatus_old(): Promise<AgentsStatusResponse> {
    return this.makeRequest('/agents/status');
  }

  async startSystem(): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/system/start', {
        method: 'POST',
      });
      
      return {
        success: true,
        message: 'Sistema IA iniciado correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al iniciar el sistema IA'
      };
    }
  }

  async stopSystem(): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/system/stop', {
        method: 'POST',
      });
      
      return {
        success: true,
        message: 'Sistema IA detenido correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al detener el sistema IA'
      };
    }
  }

  async restartSystem(): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/system/restart', {
        method: 'POST',
      });
      
      return {
        success: true,
        message: 'Sistema IA reiniciado correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al reiniciar el sistema IA'
      };
    }
  }

  async toggleAgent(agentId: string, enabled: boolean): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/agents/toggle', {
        method: 'POST',
        data: { agent_id: agentId, enabled },
      });
      
      return {
        success: true,
        message: `Agente ${enabled ? 'activado' : 'desactivado'} correctamente`
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al cambiar estado del agente'
      };
    }
  }

  async restartAgent(agentId: string): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/agents/restart', {
        method: 'POST',
        data: { agent_id: agentId },
      });
      
      return {
        success: true,
        message: 'Agente reiniciado correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al reiniciar el agente'
      };
    }
  }

  async getCosts(): Promise<CostMetrics> {
    try {
      return this.makeRequest('/costs');
    } catch (error) {
      // Return mock data if service is not available
      return {
        today: 0,
        week: 0,
        month: 0,
        total: 0,
        breakdown: []
      };
    }
  }

  async getLogs(limit: number = 100): Promise<AgentLog[]> {
    try {
      return this.makeRequest(`/logs?limit=${limit}`);
    } catch (error) {
      // Return empty array if service is not available
      return [];
    }
  }

  async clearLogs(): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/logs/clear', {
        method: 'DELETE',
      });
      
      return {
        success: true,
        message: 'Logs limpiados correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al limpiar los logs'
      };
    }
  }

  async getAgentConfig(agentId: string): Promise<any> {
    return this.makeRequest(`/agents/${agentId}/config`);
  }

  async updateAgentConfig(agentId: string, config: any): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest(`/agents/${agentId}/config`, {
        method: 'PUT',
        data: config,
      });
      
      return {
        success: true,
        message: 'Configuración actualizada correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al actualizar la configuración'
      };
    }
  }

  async getAllConfigs(): Promise<any> {
    return this.makeRequest('/agents/configs/all');
  }

  async getHealth(): Promise<{ status: string; message: string }> {
    try {
      return this.makeRequest('/health');
    } catch (error) {
      return {
        status: 'unhealthy',
        message: 'Servicio IA no disponible'
      };
    }
  }
}

export const iaService = new IAService();
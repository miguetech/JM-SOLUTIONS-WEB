const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

export interface AgentStatus {
  id: string;
  name: string;
  description: string;
  status: 'running' | 'stopped' | 'paused' | 'error';
  enabled: boolean;
  tasks_completed: number;
  cost_today: number;
  last_activity: string;
}

export interface SystemStatus {
  status: 'running' | 'stopped' | 'paused';
  active_agents: number;
  total_tasks: number;
  uptime: string;
}

export interface AgentsStatusResponse {
  system: SystemStatus;
  agents: AgentStatus[];
}

export interface CostMetrics {
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

export interface AgentLog {
  id: string;
  agent_id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
  data?: any;
}

class IAService {
  private async request(endpoint: string, options?: RequestInit) {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getAgentsStatus(): Promise<AgentsStatusResponse> {
    return this.request('/api/admin/ia/agents/status');
  }

  async startSystem(): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/ia/system/start', {
      method: 'POST',
    });
  }

  async stopSystem(): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/ia/system/stop', {
      method: 'POST',
    });
  }

  async restartSystem(): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/ia/system/restart', {
      method: 'POST',
    });
  }

  async toggleAgent(agentId: string, enabled: boolean): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/ia/agents/toggle', {
      method: 'POST',
      body: JSON.stringify({ agent_id: agentId, enabled }),
    });
  }

  async restartAgent(agentId: string): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/ia/agents/restart', {
      method: 'POST',
      body: JSON.stringify({ agent_id: agentId }),
    });
  }

  async getCosts(): Promise<CostMetrics> {
    return this.request('/api/admin/ia/costs');
  }

  async getLogs(limit: number = 100): Promise<AgentLog[]> {
    return this.request(`/api/admin/ia/logs?limit=${limit}`);
  }

  async clearLogs(): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/ia/logs/clear', {
      method: 'DELETE',
    });
  }

  async getHealth(): Promise<{ status: string; message: string }> {
    return this.request('/api/admin/ia/health');
  }
}

export const iaService = new IAService();
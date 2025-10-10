const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface ScraperStatus {
  status: 'running' | 'stopped' | 'paused' | 'error';
  searches_completed: number;
  companies_found: number;
  last_activity: string;
  uptime: string;
  current_query?: string;
  progress?: number;
}

export interface ScraperConfig {
  searches_per_minute: number;
  max_results_per_search: number;
  location: string;
  radius: number;
  categories: string[];
  auto_mode: boolean;
  search_query: string;
}

export interface ScraperSession {
  id: string;
  start_time: string;
  end_time?: string;
  status: string;
  searches_completed: number;
  companies_found: number;
  errors: number;
}

class ScraperService {
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

  async getStatus(): Promise<ScraperStatus> {
    return this.request('/api/admin/scraper/status');
  }

  async start(config: ScraperConfig): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/scraper/start', {
      method: 'POST',
      body: JSON.stringify(config),
    });
  }

  async stop(): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/scraper/stop', {
      method: 'POST',
    });
  }

  async pause(): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/scraper/pause', {
      method: 'POST',
    });
  }

  async resume(): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/scraper/resume', {
      method: 'POST',
    });
  }

  async getSessions(): Promise<ScraperSession[]> {
    return this.request('/api/admin/scraper/sessions');
  }

  async getConfig(): Promise<ScraperConfig> {
    return this.request('/api/admin/scraper/config');
  }

  async updateConfig(config: Partial<ScraperConfig>): Promise<{ success: boolean; message: string }> {
    return this.request('/api/admin/scraper/config', {
      method: 'PUT',
      body: JSON.stringify(config),
    });
  }
}

export const scraperService = new ScraperService();
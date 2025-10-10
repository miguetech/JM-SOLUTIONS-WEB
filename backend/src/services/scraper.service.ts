import axios from 'axios';

const SCRAPER_SERVICE_URL = process.env.SCRAPER_SERVICE_URL || 'http://localhost:8000';

interface ScraperStatus {
  status: 'running' | 'stopped' | 'paused' | 'error';
  searches_completed: number;
  companies_found: number;
  last_activity: string;
  uptime: string;
  current_query?: string;
  progress?: number;
}

interface ScraperConfig {
  searches_per_minute: number;
  max_results_per_search: number;
  location: string;
  radius: number;
  categories: string[];
  auto_mode: boolean;
  search_query: string;
}

interface ScraperSession {
  id: string;
  start_time: string;
  end_time?: string;
  status: string;
  searches_completed: number;
  companies_found: number;
  errors: number;
}

class ScraperService {
  private async makeRequest(endpoint: string, options?: any) {
    try {
      const response = await axios({
        url: `${SCRAPER_SERVICE_URL}${endpoint}`,
        timeout: 10000,
        ...options,
      });
      return response.data;
    } catch (error) {
      console.error(`Scraper service error (${endpoint}):`, error);
      
      // Return mock data if service is not available
      if (endpoint === '/status') {
        return {
          status: 'stopped',
          searches_completed: 0,
          companies_found: 0,
          last_activity: 'N/A',
          uptime: '0:00:00'
        };
      }
      
      throw error;
    }
  }

  async getStatus(): Promise<ScraperStatus> {
    try {
      const response = await this.makeRequest('/api/v1/jobs');
      const jobs = response.jobs || response;
      const runningJobs = jobs.filter((j: any) => j.status === 'running' || j.status === 'pending');
      
      if (runningJobs.length > 0) {
        const firstJob = runningJobs[0];
        
        // Get detailed info from first job
        let detailedInfo: any = {};
        try {
          detailedInfo = await this.makeRequest(`/api/v1/jobs/${firstJob.job_id}`);
        } catch (e) {
          console.log('Could not fetch detailed job info');
        }
        
        const progress = detailedInfo.progress || {};
        
        return {
          status: 'running',
          searches_completed: runningJobs.length,
          companies_found: progress.businesses_found || progress.opportunities_identified || 0,
          last_activity: firstJob.updated_at || firstJob.created_at || new Date().toISOString(),
          uptime: this.calculateUptime(firstJob.created_at),
          current_query: firstJob.keywords?.join(', '),
          progress: this.calculateProgress(progress)
        };
      }
      
      return {
        status: 'stopped',
        searches_completed: 0,
        companies_found: 0,
        last_activity: 'N/A',
        uptime: '0:00:00'
      };
    } catch (error) {
      return {
        status: 'stopped',
        searches_completed: 0,
        companies_found: 0,
        last_activity: 'N/A',
        uptime: '0:00:00'
      };
    }
  }

  private calculateProgress(progress: any): number {
    if (!progress) return 0;
    
    const phases = ['initializing', 'searching', 'enriching', 'analyzing', 'completed'];
    const currentPhaseIndex = phases.indexOf(progress.phase || 'initializing');
    
    if (currentPhaseIndex === -1) return 0;
    if (progress.phase === 'completed') return 100;
    
    // Each phase is 20% of total progress
    const baseProgress = (currentPhaseIndex / phases.length) * 100;
    return Math.min(Math.round(baseProgress), 95);
  }

  private calculateUptime(startTime: string): string {
    const start = new Date(startTime).getTime();
    const now = Date.now();
    const diff = Math.floor((now - start) / 1000);
    
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  async start(config: ScraperConfig): Promise<{ success: boolean; message: string }> {
    try {
      const payload = {
        keywords: [config.search_query],
        locations: [config.location],
        max_per_location: config.max_results_per_search,
        total_max: config.max_results_per_search,
        categories: config.categories,
        save_to_database: true
      };
      
      await this.makeRequest('/api/v1/scrape', {
        method: 'POST',
        data: payload,
      });
      
      return {
        success: true,
        message: 'Scraper iniciado correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al iniciar el scraper'
      };
    }
  }

  async stop(): Promise<{ success: boolean; message: string }> {
    try {
      const response = await this.makeRequest('/api/v1/jobs');
      const jobs = response.jobs || response;
      const runningJobs = jobs.filter((j: any) => j.status === 'running' || j.status === 'pending');
      
      if (runningJobs.length === 0) {
        return {
          success: false,
          message: 'No hay jobs activos para detener'
        };
      }
      
      // Cancel all running jobs
      const cancelPromises = runningJobs.map((job: any) => 
        this.makeRequest(`/api/v1/jobs/${job.job_id}`, {
          method: 'DELETE',
        }).catch((e: any) => console.error(`Error canceling job ${job.job_id}:`, e))
      );
      
      await Promise.all(cancelPromises);
      
      return {
        success: true,
        message: `${runningJobs.length} job(s) detenido(s) correctamente`
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al detener el scraper'
      };
    }
  }

  async pause(): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/pause', {
        method: 'POST',
      });
      
      return {
        success: true,
        message: 'Scraper pausado correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al pausar el scraper'
      };
    }
  }

  async resume(): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/resume', {
        method: 'POST',
      });
      
      return {
        success: true,
        message: 'Scraper reanudado correctamente'
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al reanudar el scraper'
      };
    }
  }

  async getSessions(): Promise<ScraperSession[]> {
    try {
      const response = await this.makeRequest('/api/v1/jobs');
      const jobs = response.jobs || response;
      
      return jobs.map((job: any) => ({
        id: job.job_id,
        start_time: job.created_at,
        end_time: job.completed_at || undefined,
        status: job.status,
        searches_completed: 1,
        companies_found: 0,
        errors: 0
      })).slice(0, 10); // Last 10 sessions
    } catch (error) {
      return [];
    }
  }

  async getConfig(): Promise<ScraperConfig> {
    try {
      return this.makeRequest('/config');
    } catch (error) {
      // Return default config if service is not available
      return {
        searches_per_minute: 10,
        max_results_per_search: 20,
        location: 'Madrid, España',
        radius: 5000,
        categories: [],
        auto_mode: false,
        search_query: ''
      };
    }
  }

  async updateConfig(config: Partial<ScraperConfig>): Promise<{ success: boolean; message: string }> {
    try {
      await this.makeRequest('/config', {
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
}

export const scraperService = new ScraperService();
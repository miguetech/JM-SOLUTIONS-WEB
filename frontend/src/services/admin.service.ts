import { api } from '@/lib/api';

export interface DashboardMetrics {
  totalCompanies: number;
  leadsToday: number;
  highOpportunities: number;
  scrapeSessionsToday: number;
  meetingsThisWeek: number;
  revenueThisMonth: number;
}

export interface LeadTrend {
  date: string;
  leads: number;
  conversions: number;
}

export interface NicheData {
  niche: string;
  leads: number;
  avg_score: number;
}

export interface Activity {
  type: string;
  title: string;
  description: string;
  created_at: string;
  status: string;
}

export interface ScraperStatus {
  latestSession: {
    status: string;
    session_id: string;
    companies_found: number;
    success_rate: number;
    created_at: string;
  } | null;
  performance: {
    sessions_today: number;
    avg_success_rate: number;
    total_companies_today: number;
  };
}

export interface CompleteDashboardData {
  metrics: DashboardMetrics;
  trends: LeadTrend[];
  nicheData: NicheData[];
  activity: Activity[];
  scraperStatus: ScraperStatus;
  timestamp: string;
}

export const adminService = {
  // Get complete dashboard data in one call
  async getCompleteDashboardData(): Promise<CompleteDashboardData> {
    return api.get('/admin/dashboard/complete');
  },

  // Individual endpoints for specific data
  async getDashboardMetrics(): Promise<DashboardMetrics> {
    return api.get('/admin/dashboard/metrics');
  },

  async getLeadTrends(): Promise<LeadTrend[]> {
    return api.get('/admin/dashboard/trends');
  },

  async getLeadsByNiche(): Promise<NicheData[]> {
    return api.get('/admin/dashboard/niche');
  },

  async getRecentActivity(): Promise<Activity[]> {
    return api.get('/admin/dashboard/activity');
  },

  async getScraperStatus(): Promise<ScraperStatus> {
    return api.get('/admin/scraper/status');
  },

  async getDatabaseStats() {
    return api.get('/admin/database/stats');
  },

  async getCompanies() {
    return api.get('/admin/companies');
  },
};
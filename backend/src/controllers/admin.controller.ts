import { Request, Response } from 'express';
import { AdminService } from '../services/admin.service';

const adminService = new AdminService();

// Dashboard Overview Metrics
export const getDashboardMetrics = async (req: Request, res: Response) => {
  try {
    const metrics = await adminService.getDashboardMetrics();
    res.json(metrics);
  } catch (error) {
    console.error('Error in getDashboardMetrics:', error);
    res.status(500).json({ error: 'Error al obtener métricas del dashboard' });
  }
};

// Lead Generation Trends
export const getLeadTrends = async (req: Request, res: Response) => {
  try {
    const trends = await adminService.getLeadTrends();
    res.json(trends);
  } catch (error) {
    console.error('Error in getLeadTrends:', error);
    res.status(500).json({ error: 'Error al obtener tendencias de leads' });
  }
};

// Leads by Niche
export const getLeadsByNiche = async (req: Request, res: Response) => {
  try {
    const nicheData = await adminService.getLeadsByNiche();
    res.json(nicheData);
  } catch (error) {
    console.error('Error in getLeadsByNiche:', error);
    res.status(500).json({ error: 'Error al obtener leads por nicho' });
  }
};

// Recent Activity
export const getRecentActivity = async (req: Request, res: Response) => {
  try {
    const activity = await adminService.getRecentActivity();
    res.json(activity);
  } catch (error) {
    console.error('Error in getRecentActivity:', error);
    res.status(500).json({ error: 'Error al obtener actividad reciente' });
  }
};

// Scraper Status
export const getScraperStatus = async (req: Request, res: Response) => {
  try {
    const status = await adminService.getScraperStatus();
    res.json(status);
  } catch (error) {
    console.error('Error in getScraperStatus:', error);
    res.status(500).json({ error: 'Error al obtener estado del scraper' });
  }
};

// Database Statistics
export const getDatabaseStats = async (req: Request, res: Response) => {
  try {
    const stats = await adminService.getDatabaseStats();
    res.json(stats);
  } catch (error) {
    console.error('Error in getDatabaseStats:', error);
    res.status(500).json({ error: 'Error al obtener estadísticas de la base de datos' });
  }
};

// Complete dashboard data (all metrics in one call)
export const getCompleteDashboardData = async (req: Request, res: Response) => {
  try {
    const [metrics, trends, nicheData, activity, scraperStatus] = await Promise.all([
      adminService.getDashboardMetrics(),
      adminService.getLeadTrends(),
      adminService.getLeadsByNiche(),
      adminService.getRecentActivity(),
      adminService.getScraperStatus()
    ]);

    res.json({
      metrics,
      trends,
      nicheData,
      activity,
      scraperStatus,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in getCompleteDashboardData:', error);
    res.status(500).json({ error: 'Error al obtener datos completos del dashboard' });
  }
};
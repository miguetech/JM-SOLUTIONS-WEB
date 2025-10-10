import { Router } from 'express';
import { 
  getDashboardMetrics,
  getLeadTrends,
  getLeadsByNiche,
  getRecentActivity,
  getScraperStatus,
  getDatabaseStats,
  getCompleteDashboardData
} from '../controllers/admin.controller';
import { ScraperController } from '../controllers/scraper.controller';
import { IAController } from '../controllers/ia.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();
const scraperController = new ScraperController();
const iaController = new IAController();

// Test route without auth (development only)
router.get('/test/health', (req, res) => {
  res.json({ status: 'ok', message: 'Admin routes working' });
});

// Dashboard Overview Routes (no auth in development)
router.get('/dashboard/metrics', getDashboardMetrics);
router.get('/dashboard/trends', getLeadTrends);
router.get('/dashboard/niche', getLeadsByNiche);
router.get('/dashboard/activity', getRecentActivity);
router.get('/dashboard/complete', getCompleteDashboardData);

// Scraper Management Routes
router.get('/scraper/status', scraperController.getStatus);
router.post('/scraper/start', scraperController.start);
router.post('/scraper/stop', scraperController.stop);
router.post('/scraper/pause', scraperController.pause);
router.post('/scraper/resume', scraperController.resume);
router.get('/scraper/sessions', scraperController.getSessions);
router.get('/scraper/config', scraperController.getConfig);
router.put('/scraper/config', scraperController.updateConfig);

// IA Agents Management Routes
router.get('/ia/agents/status', iaController.getAgentsStatus);
router.post('/ia/system/start', iaController.startSystem);
router.post('/ia/system/stop', iaController.stopSystem);
router.post('/ia/system/restart', iaController.restartSystem);
router.post('/ia/agents/toggle', iaController.toggleAgent);
router.post('/ia/agents/restart', iaController.restartAgent);
router.get('/ia/costs', iaController.getCosts);
router.get('/ia/logs', iaController.getLogs);
router.delete('/ia/logs/clear', iaController.clearLogs);
router.get('/ia/health', iaController.getHealth);

// Database Analytics Routes
router.get('/database/stats', getDatabaseStats);

// Companies and Opportunities (using existing controller)
router.get('/companies', async (req, res) => {
  try {
    const { getCompanies } = await import('../controllers/companies.controller');
    return getCompanies(req, res);
  } catch (error) {
    res.status(500).json({ error: 'Error loading companies controller' });
  }
});

export default router;
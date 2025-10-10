import { Request, Response } from 'express';
import { scraperService } from '../services/scraper.service';

export class ScraperController {
  async getStatus(req: Request, res: Response) {
    try {
      const status = await scraperService.getStatus();
      res.json(status);
    } catch (error) {
      console.error('Error getting scraper status:', error);
      res.status(500).json({ error: 'Error retrieving scraper status' });
    }
  }

  async start(req: Request, res: Response) {
    try {
      const config = req.body;
      const result = await scraperService.start(config);
      res.json(result);
    } catch (error) {
      console.error('Error starting scraper:', error);
      res.status(500).json({ error: 'Error starting scraper' });
    }
  }

  async stop(req: Request, res: Response) {
    try {
      const result = await scraperService.stop();
      res.json(result);
    } catch (error) {
      console.error('Error stopping scraper:', error);
      res.status(500).json({ error: 'Error stopping scraper' });
    }
  }

  async pause(req: Request, res: Response) {
    try {
      const result = await scraperService.pause();
      res.json(result);
    } catch (error) {
      console.error('Error pausing scraper:', error);
      res.status(500).json({ error: 'Error pausing scraper' });
    }
  }

  async resume(req: Request, res: Response) {
    try {
      const result = await scraperService.resume();
      res.json(result);
    } catch (error) {
      console.error('Error resuming scraper:', error);
      res.status(500).json({ error: 'Error resuming scraper' });
    }
  }

  async getSessions(req: Request, res: Response) {
    try {
      const sessions = await scraperService.getSessions();
      res.json(sessions);
    } catch (error) {
      console.error('Error getting scraper sessions:', error);
      res.status(500).json({ error: 'Error retrieving scraper sessions' });
    }
  }

  async getConfig(req: Request, res: Response) {
    try {
      const config = await scraperService.getConfig();
      res.json(config);
    } catch (error) {
      console.error('Error getting scraper config:', error);
      res.status(500).json({ error: 'Error retrieving scraper config' });
    }
  }

  async updateConfig(req: Request, res: Response) {
    try {
      const config = req.body;
      const result = await scraperService.updateConfig(config);
      res.json(result);
    } catch (error) {
      console.error('Error updating scraper config:', error);
      res.status(500).json({ error: 'Error updating scraper config' });
    }
  }
}
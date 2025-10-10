import { Request, Response } from 'express';
import { iaService } from '../services/ia.service';

export class IAController {
  async getAgentsStatus(req: Request, res: Response) {
    try {
      const status = await iaService.getAgentsStatus();
      res.json(status);
    } catch (error) {
      console.error('Error getting IA agents status:', error);
      res.status(500).json({ error: 'Error retrieving IA agents status' });
    }
  }

  async startSystem(req: Request, res: Response) {
    try {
      const result = await iaService.startSystem();
      res.json(result);
    } catch (error) {
      console.error('Error starting IA system:', error);
      res.status(500).json({ error: 'Error starting IA system' });
    }
  }

  async stopSystem(req: Request, res: Response) {
    try {
      const result = await iaService.stopSystem();
      res.json(result);
    } catch (error) {
      console.error('Error stopping IA system:', error);
      res.status(500).json({ error: 'Error stopping IA system' });
    }
  }

  async restartSystem(req: Request, res: Response) {
    try {
      const result = await iaService.restartSystem();
      res.json(result);
    } catch (error) {
      console.error('Error restarting IA system:', error);
      res.status(500).json({ error: 'Error restarting IA system' });
    }
  }

  async toggleAgent(req: Request, res: Response) {
    try {
      const { agent_id, enabled } = req.body;
      
      if (!agent_id || typeof enabled !== 'boolean') {
        return res.status(400).json({ error: 'agent_id and enabled are required' });
      }

      const result = await iaService.toggleAgent(agent_id, enabled);
      res.json(result);
    } catch (error) {
      console.error('Error toggling agent:', error);
      res.status(500).json({ error: 'Error toggling agent' });
    }
  }

  async restartAgent(req: Request, res: Response) {
    try {
      const { agent_id } = req.body;
      
      if (!agent_id) {
        return res.status(400).json({ error: 'agent_id is required' });
      }

      const result = await iaService.restartAgent(agent_id);
      res.json(result);
    } catch (error) {
      console.error('Error restarting agent:', error);
      res.status(500).json({ error: 'Error restarting agent' });
    }
  }

  async getCosts(req: Request, res: Response) {
    try {
      const costs = await iaService.getCosts();
      res.json(costs);
    } catch (error) {
      console.error('Error getting IA costs:', error);
      res.status(500).json({ error: 'Error retrieving IA costs' });
    }
  }

  async getLogs(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 100;
      const logs = await iaService.getLogs(limit);
      res.json(logs);
    } catch (error) {
      console.error('Error getting IA logs:', error);
      res.status(500).json({ error: 'Error retrieving IA logs' });
    }
  }

  async clearLogs(req: Request, res: Response) {
    try {
      const result = await iaService.clearLogs();
      res.json(result);
    } catch (error) {
      console.error('Error clearing IA logs:', error);
      res.status(500).json({ error: 'Error clearing IA logs' });
    }
  }

  async getHealth(req: Request, res: Response) {
    try {
      const health = await iaService.getHealth();
      res.json(health);
    } catch (error) {
      console.error('Error getting IA health:', error);
      res.status(500).json({ error: 'Error retrieving IA health' });
    }
  }
}
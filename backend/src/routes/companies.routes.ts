import { Router } from 'express';
import { getCompanies, getCompanyById } from '../controllers/companies.controller';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.get('/', authenticateToken, getCompanies);
router.get('/:id', authenticateToken, getCompanyById);

export default router;

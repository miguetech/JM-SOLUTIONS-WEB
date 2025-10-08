import { Router } from 'express';
import authRoutes from './auth.routes';
import companiesRoutes from './companies.routes';
import contactRoutes from './contact.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/companies', companiesRoutes);
router.use('/contact', contactRoutes);

export default router;

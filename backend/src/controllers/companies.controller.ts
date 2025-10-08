import { Request, Response } from 'express';
import pool from '../config/database';

export const getCompanies = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM companies LIMIT 50');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
};

export const getCompanyById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM companies WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Empresa no encontrada' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empresa' });
  }
};

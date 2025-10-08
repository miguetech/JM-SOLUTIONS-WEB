import { Request, Response } from 'express';

export const sendContactMessage = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    
    console.log('Contact form submission:', { name, email, message });
    
    res.status(200).json({ 
      success: true, 
      message: 'Mensaje recibido. Te contactaremos pronto.' 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
};

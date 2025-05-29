// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../models/User';

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

/**
 * Middleware to protect routes
 * Verifies JWT token and adds user to request
 */
export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    let token;

    // Get token from Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      res.status(401).json({ message: 'Not authorized, no token' });
      return;
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      res.status(401).json({ message: 'Not authorized, invalid token' });
      return;
    }

    // Add user to request
    req.user = { id: decoded.id };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Not authorized' });
  }
};
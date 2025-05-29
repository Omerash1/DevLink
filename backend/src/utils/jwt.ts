// src/utils/jwt.ts
import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateToken = (id: string): string => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: '30d',
  });
};
import { IAuthService } from '../../interfaces/Services/Admin/AuthService';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'nagato-pain-788'; 

export class AuthService implements IAuthService {

  generateToken(payload: any): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
  }
}

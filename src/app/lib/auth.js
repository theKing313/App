// lib/auth.js
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'your_jwt_secret';

export function verifyToken(req) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        throw new Error('No token provided');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

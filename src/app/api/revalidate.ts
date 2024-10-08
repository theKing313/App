// pages/api/protected.js
import { verifyToken } from '../lib/auth';

export default function handler(req, res) {
    try {
        const user = verifyToken(req);
        return res.status(200).json({ message: 'This is a protected route', user });
    } catch (err) {
        return res.status(401).json({ error: err.message });
    }
}

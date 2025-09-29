import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();
export const storeCookies = (res, payload) => {
    const isProduction = process.env.NODE_ENV === 'production';
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'strict' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });
}
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface User {
    id: string;
}

export const cookieAuth = (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401).send('Unauthorized');
        return;
    }

    const token = authorization.split(' ')[1];

    try {
        const decoded = jwt.verify(token, "BRUH") as { id: string };

        if (decoded && typeof decoded.id === 'string') {
        
            (req as any).user = { id: decoded.id } as User;
        } else {
            throw new Error('Invalid token format');
        }

        next();
    } catch (e) {
        res.status(401).send('Unauthorized');
    }
};

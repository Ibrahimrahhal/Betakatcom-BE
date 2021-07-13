import { Router, Request, Response } from 'express';

const app = Router();

app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
});

export default app;


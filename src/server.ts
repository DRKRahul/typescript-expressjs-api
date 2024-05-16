import express, { type Request, type Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { itemsRouter } from './items/items.router';

interface ServerOptions {
    port: number;
    apiPrefix?: string;
}

export class Server {
 private readonly app = express();
 private readonly port: number;

 constructor(options: ServerOptions) {
  const { port } = options;
  this.port = port;
 }

 async start(): Promise<void> {
  this.app.use(express.json());
  this.app.use(express.urlencoded({ extended: true }));
  this.app.use(compression());
  //  limit repeated requests to public APIs
  this.app.use(
   rateLimit({
    max: parseInt(process.env.RATE_LIMIT_PERIOD ?? '50', 10),
    windowMs: parseInt(process.env.RATE_LIMIT_PERIOD ?? '10000', 10),
    message: 'Too many requests from this IP, please try again in one hour'
   })
  );

  // Test rest api
  this.app.use("/api/menu/items", itemsRouter);
  this.app.get('/', (_req: Request, res: Response) => {
   return res.status(200).send({
    message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
   });
  });

  this.app.listen(this.port, () => {
   console.log(`Server running on port ${this.port}...`);
  });
 }
}

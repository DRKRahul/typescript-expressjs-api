import dotenv from 'dotenv';
import { Server } from './server';

dotenv.config();

(() => {
 main();
})();

function main(): void {
 const server = new Server({
  port: parseInt(process.env.PORT ?? '8000', 10)
 });
 void server.start();
}

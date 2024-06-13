import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Your middleware logic here
    console.log(next);
    // Example: Add a property to the request object
    // req['customProperty'] = 'Custom Value';
    next();
  }
}

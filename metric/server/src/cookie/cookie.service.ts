import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class CookieService {
  constructor() {}

  set(res: Response, key: string, value: string): void {
    if (!res.cookie) return;
    res.cookie(key, value);
  }

  get(req: Request, key: string): string | undefined {
    if (!req.cookies) return;

    if (!(key in req.cookies)) return;
    return req.cookies[key];
  }
}

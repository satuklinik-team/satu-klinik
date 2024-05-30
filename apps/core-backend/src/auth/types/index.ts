import { Role } from '@prisma/client';

export type JwtPayload = {
  sub: string;
  clinicsId: string;
  role: Role;
  source: 'browser' | 'cli';
};

export type JwtPayload = {
  sub: string;
  email: string;
  source: 'browser' | 'cli';
};

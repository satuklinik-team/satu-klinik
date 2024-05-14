export type JwtPayload = {
  sub: string;
  clinicsId: string;
  source: 'browser' | 'cli';
};

import * as jose from 'jose';

const secret = new TextEncoder().encode('SECRET');

export const getAccessToken = ({ userId }: { userId: number }) =>
  new jose.SignJWT({ userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('2h').sign(secret);

export const getRefreshToken = ({ userId }: { userId: number }) =>
  new jose.SignJWT({ userId }).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('2w').sign(secret);

export const decodeJwt = (token: string) => jose.decodeJwt(token);

import { DB_TYPES } from './dbTypes';

export const HOST = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3000';
export const ENV = process.env.NODE_ENV || 'development';

export const DB_TYPE = process.env.DB_TYPE || DB_TYPES.MONGO;

export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;

export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

/** Important **/
/** You should not be committing this file to GitHub **/
/** Repeat: DO! NOT! COMMIT! THIS! FILE! TO! YOUR! REPO! **/
export const sessionSecret = process.env.SESSION_SECRET || 'Your Session Secret goes here';

export const google = {
  clientID: process.env.GOOGLE_CLIENTID || '62351010161-eqcnoa340ki5ekb9gvids4ksgqt9hf48.apps.googleusercontent.com',
  clientSecret: process.env.GOOGLE_SECRET || '6cKCWD75gHgzCvM4VQyR5_TU',
  callbackURL: process.env.GOOGLE_CALLBACK || '/auth/google/callback'
};

//DO NEW
export const AWS_SECRET_ACCESS_ID = process.env.AWS_SECRET_ACCESS_ID || 'AKIAIILK3NSWIGD6XILA';
export const AWS_SECRET_ACCESS_SECRET = process.env.AWS_SECRET_ACCESS_SECRET || '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';
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || 'photo-app-gudda';


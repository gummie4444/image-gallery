/**
 * Routes for express app
 */
import passport from 'passport';
import unsupportedMessage from '../db/unsupportedMessage';
import { controllers, passport as passportConfig } from '../db';
import multer from 'multer';
import path from 'path';

const TARGET_PATH = path.resolve('../public/uploads');

console.log(TARGET_PATH,"target");
console.log(__dirname,"dirname")

//Breyta path
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './server/publics/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname.replace(/\s/g, ''));
  }
});

const upload = multer({ storage: storage });

const usersController = controllers && controllers.users;
const imagesController = controllers && controllers.images;

export default (app) => {
  // user routes
  if (usersController) {
    app.post('/login', usersController.login);
    app.post('/signup', usersController.signUp);
    app.post('/logout', usersController.logout);
  } else {
    console.warn(unsupportedMessage('users routes'));
  }

  if (passportConfig && passportConfig.google) {
    // google auth
    // Redirect the user to Google for authentication. When complete, Google
    // will redirect the user back to the application at
    // /auth/google/return
    // Authentication with google requires an additional scope param, for more info go
    // here https://developers.google.com/identity/protocols/OpenIDConnect#scope-param
    app.get('/auth/google', passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
      ]
    }));

    // Google will redirect the user to this URL after authentication. Finish the
    // process by verifying the assertion. If valid, the user will be logged in.
    // Otherwise, the authentication has failed.
    app.get('/auth/google/callback',
      passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );
  }

  // image routes
  if (imagesController) {
    app.get('/images', imagesController.all);
    app.post('/image/:image', upload.single('file'), imagesController.add);
    app.put('/image/:image', imagesController.update);
    app.delete('/image/:image', imagesController.remove);
    app.get('/image/:image', imagesController.image);
  } else {
    console.warn(unsupportedMessage('image routes'));
  }
};


import express from "express";
import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../models/users.js'
import sha512 from 'crypto-js/sha512.js'

var authRouter = express.Router();

passport.use(new LocalStrategy( async function verify(username, password, done) {
    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        console.log("Username fail")
        return done(null, false, { message: 'Incorrect username.' });
      }
      const passwordMatch = (user.password.toString() == sha512(password).toString())
      if (!passwordMatch) {
        console.log("Password fail")
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

authRouter.post('/login', (req, res, next) => {
  console.log("REQ LOGIN", req.body)
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: 'Incorrect username or password.' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

authRouter.delete('/logout', (req, res, next) => {
  console.log("LOGOUT")
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
  })
  return res.json({ message: 'logout successful' });
});

export default authRouter

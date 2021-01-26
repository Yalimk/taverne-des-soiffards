// Personal modules imports
// import { Logger, logMoment } from '../Logger/logger.js';
import User from '../Models/user.js';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';

// dotenv config
dotenv.config();

// Controller enabling signup functionality
export const signup = async (req, res) => {
  const userExists = await User.findOne(
    {
      $or: [
        { email: req.body.email },
        { pseudo: req.body.pseudo }
      ],
    }
  );
  if (userExists) {
    return res.status(403).json({
      error: 'E-mail or pseudo already taken.',
    });
  } else {
    const user = new User(req.body);
    await user.save();
    res.status(200).json({
      message:
        'Tes papiers sont en règles, moussaillon. Tu peux entrer dans la taverne, maintenant...',
    });
  }
};

// Controller enabling signout functionality
export const signin = (req, res) => {
  const {email, password} = req.body;
  User.findOne({email}, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'Aucun pirate lié à cet adresse de courrier. Enregistre-toi, moussaillon !'
      });
    }
    if (!user.authenticateUser(password)) {
      return res.status(401).json({
        error: `Adresse de courrier et mot de passe ne correspondent pas, marin d'eau douce !`
      });
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    res.cookie('t', token, {
      expire: new Date() + 6000
    });
    const {_id, pseudo, email} = user;
    return res.json({
      token,
      user: {_id, email, pseudo}
    });
  });
};

// Controller enabling signout functionality
export const signout = (req, res) => {
  res.clearCookie('t');
  return res.json({
    message: `Tu viens de quitter la taverne, moussaillon. A bientôt !`
  });
};

// Controller checking whether user is signed in
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});

// Controller to check if user has a token (after signing in)
export const checkSigninToken = (err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: `Vous devez passer le garde de la taverne pour avoir accès à ce contenu, marin d'eau douce !`
    });
  }
};


 
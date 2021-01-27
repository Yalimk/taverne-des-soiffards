// Native modules import
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import dotenv from 'dotenv';

// Personal modules import
import User from '../models/user.js';
import { Logger, logMoment } from '../logger/logger.js';

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
      error: `Tu es amnésique ou tu essaies de voler l'identité de quelqu'un, moussaillon ? Cet e-mail ou/et ce pseudo est/sont déjà pris ! (erreur 403)`,
    });
  } else {
    const user = new User(req.body);
    await user.save();
    Logger.info(`L'utilisateur ${user.pseudo}, e-mail ${user.email}, id ${user._id} a été créé en base de données avec succès.`);
    return res.json({
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
        error: 'Aucun pirate lié à cet adresse de courrier. Enregistre-toi, moussaillon ! (erreur 401)'
      });
    }
    if (!user.authenticateUser(password)) {
      return res.status(401).json({
        error: `Adresse de courrier et mot de passe ne correspondent pas, marin d'eau douce ! (erreur 401)`
      });
    }
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
    res.cookie('t', token, {
      expire: new Date() + 60000
    });
    const {_id, pseudo, email} = user;
    Logger.info(`L'utilisateur ${pseudo}, e-mail ${email}, id ${_id} vient de se connecter à la Taverne des Soiffards.`);
    return res.json({
      token,
      user: {_id, email, pseudo}
    });
  });
};

// Controller enabling signout functionality
export const signout = (req, res) => {
  res.clearCookie('t');
  Logger.info(`L'utilisateur ${req.body.pseudo}, e-mail ${req.body.user.email}, id ${req.body.user._id} vient de se déconnecter de la Taverne des Soiffards.`);
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
      error: `Vous devez passer le garde de la taverne pour avoir accès à ce contenu, marin d'eau douce ! (erreur 401)`
    });
  }
  next();
};


 
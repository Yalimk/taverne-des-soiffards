// Native modules imports
import _ from 'lodash';
import { Logger, logMoment } from '../Logger/logger.js';

// Personal modules imports
import User from '../Models/user.js';

export const userById = (req, res, next, userId) => {
  User.findById(userId)
  .exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `Ce pirate n'existe pas ou une erreur s'est produite.`
      })
    }
    req.profile = user;
    next();
  });
};

export const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
  if (!authorized) {
    return res.status(403).json({
      error: `Tu n'as pas la permission de faire ça, moussaillon, où est-ce que tu te crois ?! Chez mémé ?!`
    });
  }
};

export const allUsers = (req, res) => {
  User.find({}, {email: true, pseudo: true, updated: true, created: true}, (err, users) => {
    if (err) {
      Logger.error(`${logMoment.dateAndTime} : La méthode allUsers a rencontré une erreur : ${err}.`);
      return res.status(400).json({
        error: err
      });
    }
    return res.json({users});
  })
};

export const getUser = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json({
    pseudo: req.profile.pseudo,
    email: req.profile.email,
    created: req.profile.created,
    updated: req.profile.updated,
  });
};

export const updateUser = (req, res, next) => {
  let user = req.profile;
  user = _.assignIn(user, req.body);
  user.updated = Date.now();
  user.save((err, updatedUser) => {
    if (err) {
      Logger.error(`${logMoment.dateAndTime} : La méthode updateUser a rencontré une erreur : ${err}.`);
      return res.status(400).json({
        error: `Tu n'as pas le droit de faire ça, marin d'eau douce !`
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    Logger.info(`${logMoment.dateAndTime} : L'utilisateur ${updatedUser.pseudo}, e-mail ${updatedUser.email}, id ${updatedUser._id} a été mise à jour avec succès. `);
    return res.json({
      pseudo: user.pseudo,
      email: user.email,
      created: user.created,
      updated: user.updated,
    });
  });
};

export const deleteUser = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      Logger.error(`${logMoment.dateAndTime} : La méthode deleteUser a rencontré une erreur : ${err}.`);
      return res.status(400).json({
        error: err
      });
    }
    Logger.info(`${logMoment.dateAndTime} : L'utilisateur ${deletedUser.pseudo}, e-mail ${deletedUser.email}, id ${deletedUser._id} a été supprimé avec succès.`);
    return res.json({
      message: `Le pirate ${deletedUser.pseudo} dont l'adresse de courrier est ${deletedUser.email} a été annihilé. Bon vent !`
    });
  })
}
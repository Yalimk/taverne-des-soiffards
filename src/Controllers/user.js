// Personal modules imports
import User from '../Models/user.js';

export const userById = (req, res, next, userId) => {
  User.findById(userId)
  .exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: `L'utilisateur n'a pas été trouvé ou une erreur s'est produite.`
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

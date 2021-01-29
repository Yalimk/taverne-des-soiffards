// Native modules import
import express from 'express';
import { check, body, validationResult } from 'express-validator';

// Personal modules import
import { signup, signin, signout } from '../controllers/auth.js';
import { userById } from '../controllers/user.js';

// Constants declaration
const router = express.Router();

// Route for user sign up
router.post(
  '/signup',
  body('pseudo', 'Il te faut un pseudonyme, moussaillon !')
    .notEmpty()
    .isLength({
      min: 4,
      max: 30,
    })
    .withMessage(
      `Un pseudonyme de 4 caractères au moins et 30 au maximum, marin d'eau douce !`
    )
    .trim(),
  body(
    'email',
    'Tu dois impérativement renseigner un courrier de contact, flibustier !'
  )
    .notEmpty()
    .isEmail()
    .withMessage(
      'Ton courrier de contact doit contenir un @ et une extension (.fr, .com, .pirate), moussaillon !'
    )
    .normalizeEmail(),
  body(
    'password',
    `Il te faut un mot de passe pour pouvoir t'identifier par la suite !`
  )
    .notEmpty()
    .matches(
      /^(?=(?:[^A-Z]*[A-Z]){1,}(?![^A-Z]*[A-Z]))(?=(?:[^a-z]*[a-z]){1,}(?![^a-z]*[a-z]))(?=(?:[^0-9]*[0-9]){1,}(?![^0-9]*[0-9]))(?=(?:[^!'#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]*[!'#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]){1,}(?![^!'#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~]*[!'#\$%&'\(\)\*\+,-\.\/:;<=>\?@[\]\^_`\{\|}~])).{8,}$/
    )
    .withMessage(
      `Pour plus de sécurité, ton mot de passe doit contenir au moins 8 caractères, une lettre minuscule, une lettre majuscule, un chiffre et un caractère spécial, marin d'eau douce !`
    ),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(400).json({ error: firstError });
    }
    next();
  },
  signup
);

// Route for user sign in
router.post(
  '/signin',
  check('email')
    .notEmpty()
    .isEmail()
    .withMessage(
      `Ne me prends pas pour un louveteau de mer, ceci n'est pas une adresse de courrier électronique !`
      )
    .normalizeEmail(),
  check('password')
    .notEmpty()
    .withMessage(
      `Je dois vérifier que tu n'es pas un espion à la solde du gouvernement ! Donne ton mot de passe !`
    ),
  signin
);

// Route for user sign out
router.get('/signout', signout);

// Router to check for user id in parameters
router.param('userId', userById);

export default router;

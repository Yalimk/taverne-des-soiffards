// Native modules import
import nodeMailer from 'nodemailer';

// Personal modules import
import { Logger, logMoment } from '../logger/logger.js';

export const sendEmail = async (emailData) => {
  let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'alexandremasson33@gmail.com',
      pass: 'dnuhhsjbztqbtjca',
    },
  });
  try {
    const info = await transporter.sendMail(emailData);
    return Logger.info(
      `${logMoment.dateAndTime}: Message de récupération de mot de passe envoyé: ${info.response}`
    );
  } catch (err) {
    return Logger.error(
      `${logMoment.dateAndTime}: Une erreur est survenue pendant l'envoi de l'e-mail : ${err}`
    );
  }
};

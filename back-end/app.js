// Native modules imports
import express from 'express';
import favicon from 'express-favicon';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import fs from 'fs';


// Personal modules imports
import { Logger, logMoment } from './src/Logger/logger.js';
// import * as CONST from './src/Helpers/CONSTANTS.js';

// dotenv config to get access to all environment variables
dotenv.config();

// Adding the routes
import postRoutes from './src/Routes/post.js';
import authRoutes from './src/Routes/auth.js';
import userRoutes from './src/Routes/user.js';
import { checkSigninToken } from './src/Controllers/auth.js';

// Constants definition
const app = express();
const PORT = process.env.PORT || 9092;

// Middlewares definition
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(checkSigninToken);
app.use('/tds', authRoutes);
app.use('/tds', postRoutes);
app.use('/tds', userRoutes);
app.use(favicon('public/images/favicon.png'));

// Connection to MongoDB Atlas database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Logger.info(
      `${logMoment.dateAndTime}: connected to database '${mongoose.connection.db.databaseName}'.`
    );
  });
mongoose.connection.on('error', (err) => {
  Logger.error(`db connection error: ${err.message}`);
});

// apiDocs
app.get('/docs', (req, res) => {
  fs.readFile('Docs/api-docs.json', (err, data) => {
    if (err) {
      return res.status(400).json({
        error: err
      });
    }
    const docs = JSON.parse(data);
    return res.json(docs);
  })
})

const server = app.listen(PORT, () => {
  Logger.info(`${logMoment.dateAndTime}: app listening on port ${PORT}.`);
});
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request,socket, head, socket => {
    wsServer.emit('connection', socket, request);
  });
});

// Commented that out until I figure out what's wrong with the password thing.
// Handling different types of errors and logging to log files
// const errorTypes = ['unhandledRejection', 'uncaughtException'];
// errorTypes.map((type) => {
//   process.on(type, async () => {
//     try {
//       Logger.error(`${logMoment.dateAndTime}: Error of type process.on ${type} occurred.`);
//       process.exit(0);
//     } catch (_) {
//       Logger.error(`${logMoment.dateAndTime}: Encountered an error of type ${_.message}.`);
//       process.exit(1);
//     }
//   });
// });

// **************** Simple live chat code attempt ****************

// Native modules import
import WebSocket from 'ws';
// Constants definition
const wsServer = new WebSocket.Server({noServer: true});

wsServer.on('connection', (socket) => {
  socket.on('message', (data) => {
    wsServer.clients.forEach((client) => {
      if (socket !== client && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
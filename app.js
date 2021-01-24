// Native modules imports
import express from 'express';
import favicon from 'express-favicon';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import {v4 as uuidv4} from 'uuid';

// Personal modules imports
import {Logger, logMoment} from './src/Logger/logger.js';
import postRoutes from './src/Routes/post.js';
import * as CONST from './src/Helpers/CONSTANTS.js';

// dotenv config
dotenv.config();

// Constants definition
const app = express();

// Middlewares definition
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', postRoutes);
app.use(cors());
app.use("/css", express.static("public/assets/css"));
app.use("/img", express.static("public/images"));
app.use(favicon("public/images/favicon.png"));

// Connection to MongoDB Atlas database
mongoose.connect(
    process.env.MONGO_URI, 
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(() => {
        Logger.info(`Connected to database "${mongoose.connection.db.databaseName}".`);
    })
mongoose.connection.on('error', err => {Logger.error(`db connection error: ${err.message}`)});

app.listen(CONST.PORT, () => {
    Logger.info(`App listening on port ${CONST.PORT}.`)
}); 
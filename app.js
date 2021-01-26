// Native modules imports
import express from "express";
import favicon from "express-favicon";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';

// Personal modules imports
import { Logger, logMoment } from "./src/Logger/logger.js";
import * as CONST from "./src/Helpers/CONSTANTS.js";

// dotenv config
dotenv.config();

// Adding the routes
import postRoutes from "./src/Routes/post.js";
import authRoutes from "./src/Routes/auth.js";
import { checkSigninToken } from "./src/Controllers/auth.js";

// Constants definition
const app = express();

// Middlewares definition
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use(checkSigninToken);
app.use(cors());
app.use("/css", express.static("public/assets/css"));
app.use("/img", express.static("public/images"));
app.use(favicon("public/images/favicon.png"));

// Connection to MongoDB Atlas database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    Logger.info(
      `${logMoment.dateAndTime}: connected to database "${mongoose.connection.db.databaseName}".`
    );
  });
mongoose.connection.on("error", (err) => {
  Logger.error(`db connection error: ${err.message}`);
});

app.listen(CONST.PORT, () => {
  Logger.info(`${logMoment.dateAndTime}: app listening on port ${CONST.PORT}.`);
});

process.on("uncaughtException", (err) => {
  console.log(err);
});

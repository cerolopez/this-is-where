import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import usersDB from "./db/usersDB.js";
import initializePassport from "./auth.js";
import dataGenerator from "./fakeDataGenerator.js";
const getUserByUsername = usersDB.getUserByUsername;
const getUserById = usersDB.getUserById;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import router from "./routes/routes.js";

import { fileURLToPath } from 'url';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'frontend/build')));


app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

initializePassport(passport, getUserByUsername, getUserById);
app.use(passport.initialize());
app.use(passport.session());


app.use("/", router);

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});


export default app;

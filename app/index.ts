import express, { Express, Request, Response, NextFunction } from 'express';
import knex from 'knex'
import cors from 'cors';
import { Model } from 'objection';
import routes from '../config/routes';
import dotenv from 'dotenv';
import path = require('path');

dotenv.config();
const {CLIENT,DATABASE, USER,PASSWORD} = process.env

const app: Express = express();
// Set the static files directory
app.use('/public', express.static(path.join(__dirname, 'public')));

//knex
const knexInstance = knex({
    client: CLIENT,
    connection: {
    database: DATABASE,
    user: USER,
    password: PASSWORD
    }
})

Model.knex(knexInstance);
//endknex

app.use(cors());

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/v1/', routes.apiRouter)


export default app;
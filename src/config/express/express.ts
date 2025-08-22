import express, { Application } from 'express';
import cors from 'cors';
import { mainRouter } from '#Routes/index.js';

export const app: Application = express();
app.use(cors());
app.use('/',mainRouter);
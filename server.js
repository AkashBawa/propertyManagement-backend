import dotEnv from 'dotenv';
dotEnv.config()

import express from 'express';
import  http from 'http';
import bodyParser  from 'body-parser';
import Router from './routes/index.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(Router)
const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`app is listening to port ${port}`)
})
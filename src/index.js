import express from 'express'
import bodyParser from 'body-parser';
import db from './lib/db.js';
import cors from 'cors';
import helmet from 'helmet';
import {config} from 'dotenv';
import authRoute from './routes/auth.js';
import noteRoute from './routes/note.js';
import cookieParser from 'cookie-parser';

config();
const app = express();
const Port = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(cookieParser());

app.use('/keep/auth',authRoute);
app.use('/keep/note',noteRoute);


app.listen(Port,()=>{
    console.log(`server is listening on Port ${Port}`);
})
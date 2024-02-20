const express = require('express');
const app = express();
const port = 3000;
const cookieParser = require('cookie-parser');


import { eventRouter } from './routes/eventRouter';
import { userRouter } from './routes/userRouter';

app.use(cookieParser());


app.use(express.json()); 

app.use('/events', eventRouter);

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
    });


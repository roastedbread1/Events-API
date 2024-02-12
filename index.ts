const express = require('express');
const app = express();
const port = 3000;


import { eventRouter } from './routes/eventRouter';
import { userRouter } from './routes/userRouter';




app.use(express.json()); 

app.use('api/events', eventRouter);

app.use('api/users', userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });


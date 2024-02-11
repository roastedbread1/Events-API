const express = require('express');
const app = express();
const port = 3000;

const evenRouter = require('./routes/eventRouter.js');
const userRouter = require('./routes/userRouter');

app.use(express.static('public'));

app.use('api/events', evenRouter);

app.use('api/users', userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });


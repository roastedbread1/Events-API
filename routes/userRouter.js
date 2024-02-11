const express = require('express');
const userRouter = express.Router();

const UserController = require('../controllers/userController');

userRouter.post('/', UserController.createUser);

userRouter.get('/', UserController.getUsers);


userRouter.get('/:id', UserController.getUserByID);

userRouter.put('/:id', UserController.updateUser);

userRouter.delete('/:id', UserController.deleteUser);


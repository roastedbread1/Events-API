import express from 'express';
import {createUser , getUsers, getUserByID, updateUser, deleteUser, login} from '../controllers/userController';
import { cookieAuth } from '../middleware/cookieAuth';

const userRouter = express.Router();

userRouter.post('/register', createUser);
userRouter.post('/login', login);


userRouter.get('/',cookieAuth,  getUsers);
userRouter.get('/:id',cookieAuth,  getUserByID);
userRouter.put('/:id',cookieAuth,  updateUser);
userRouter.delete('/:id',cookieAuth,  deleteUser);

export { userRouter };

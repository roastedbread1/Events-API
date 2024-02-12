import express from 'express';
import {createUser , getUsers, getUserByID, updateUser, deleteUser} from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getUserByID);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);

export { userRouter };

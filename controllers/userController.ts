import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const { v4: uuidv4} = require('uuid');
import { MO } from '../models/users';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import PasswordValidator from 'password-validator';
import { validate } from 'express-validation';

export const users: MO.User[] = [];
const passwordSchema = new PasswordValidator();
passwordSchema
    .is().min(8)
    .is().max(16)
    .has().uppercase()
    .has().lowercase()
    .has().digits()
    .has().not().spaces();

    const validatePassword = (password: string) => {
        if (!passwordSchema.validate(password)) {
            return false;
        }
        return true;
    }

    const validateEmail = (email: string) => {
        if (!validator.isEmail(email)) {
            return false;
        }
        return true;
    }


   export const  createUser = (req: Request, res: Response) => {
        const { name, email, password } = req.body;
        const id = uuidv4();
        if (!name || !email || !password) {
            res.status(400).send('Missing required information');
            return;
        }
        if (!validateEmail(email)) {
            res.status(400).send('Invalid email');
            return;
        }
        if (!validatePassword(password)) {
            res.status(400).send('Invalid password');
            return;
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = new MO.User(id, name, email, hashedPassword);
        users.push(newUser);
        res.status(201).json(newUser);
    }

    export const login = async(req : Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await users.find(user => user.email === email);
            if (!user) {
                return res.status(401).send('User not found');
            }
            if (!validateEmail(email)) {
                res.status(400).send('Invalid email');
                return;
            }
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).send('Invalid password');
            }
            const token = jwt.sign({ id: user.id }, "BRUH", { expiresIn: '5h' });
            return res.json({ 
                data : {    
                    id: user.id
                }, 
                token : token
             });
            
        } catch (e) {
            res.status(500).json({ error: "login failed" });
        };
}

    export const getUsers = (req: Request, res: Response) => {
        res.status(200).json(users);
    }

  export const   getUserByID =  (req: Request, res: Response) => {
        const id = req.params.id;
        const user = users.find(user => user.id === id);

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).send('User not found');
        }
    }

   export const  updateUser = (req: Request, res: Response) => {
        const id = req.params.id;
        const { name, email, password } = req.body;
        const user = users.find(user => user.id === id);
        
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        if (!name && !email && !password) {
            res.status(400).send('At least one field is required');
            return;
        }

        user.name = name || user.name;
        user.email = email || user.email;
        user.password = password || user.password;
        res.status(200).json(user);
    }

    export const deleteUser = (req: Request, res: Response) => {
        const id = req.params.id;
        const index = users.findIndex(user => user.id === id);

        if (index !== -1) {
            users.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send('User not found');
        }
    }


const User = require('./models/users');

const users = [];

const UserController = {
    
        createUser: (req, res) => {
            const { id, name, email, password } = req.body;

            if(!id || !name || !email || !password){
                res.status(400).send('Missing required information');
                return;
            }

            const hashedPassword = bcrypt.hashSync(password, 10);

            const newUser = new User(id, name, email, hashedPassword);
            users.push(newUser);
            res.status(201).json(newUser);
        }, 
    
        getUsers: (req, res) => {
    
            res.status(200).json(users);
    
        },
    
        getUserByID: (req, res) => {
            const id = req.params.id;
            const user = users.find(user => user.id === id);
            if(user){
                res.status(200).json(user);
            } else {
                res.status(404).send('User not found');
            }
        },
    
        updateUser: (req, res) => {
            const id = req.params.id;
            
            const { name, email, password } = req.body;
            const user = users.find(user => user.id === id);

            if(!user ){
                res.status(404).send('User not found');
                return;
            }

            if(!name && !email && !password){
                res.status(400).send('at least one field is required');
                return;
            } 
                user.name = name;
                user.email = email;
                user.password = password;
                res.status(200).json(user);
            
        }, 
    
        deleteUser: (req, res) => {
            const id = req.params.id;
            const index = users.findIndex(user => user.id === id);
            if(index !== -1){
                users.splice(index, 1);
                res.status(204).send();
            } else {
                res.status(404).send('User not found');
            }
        }

}

module.exports = UserController;
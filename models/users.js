const bcrypt = require('bcrypt');

export class User {
    constructor(id, name, email, password, events){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = bcrypt.hashSync(password, 10);
        this.events = [];
    }

    registerForEvent(event){
        this.events.push(event);
        event.registerParticipant(this);
    }

    unregisterFromEvent(event){
        const index = this.events.indexOf(event);
        if (index !== -1) {
            this.events.splice(index, 1);
            event.unregisterParticipant(this);

        } else {
            throw new Error('User is not registered for this event');
        }
    }

    static fromJSON(json){
        const user = new User(json.id, json.name, json.email, json.password);
        user.events = json.events;
        return user;
    }

    toJSON(){
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            events: this.events
        }
    }


}
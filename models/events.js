export class Event{
    constructor(id, title, date, description, location, maxParticipants, participans) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.description = description;
        this.location = location;
        this.maxParticipants = maxParticipants;
        this.participans = [];
    }

    registerParticipant(user){
        if(this.participans.length < this.maxParticipants){
            this.participans.push(user);
        }
    }

    unregisterParticipant(user){
        const index = this.participans.indexOf(user);
        if(index !== -1){
            this.participans.splice(index, 1);
        }
    }
}


import { MO as MOEvents } from '../models/events';

export namespace MO {
    export class User {
        id: string;
        name: string;
        email: string;
        password: string;
        events: string[];

        constructor(id: string, name: string, email: string, password: string) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.password = password;
            this.events = [];
        }

        registerForEvent(event: MOEvents.Event) {
            if (MOEvents.Event.eventExist(event)) {
                this.events.push(event.id);
                MOEvents.Event.registerParticipant(event, this.name);
            }
        }

        unregisterFromEvent(event : MOEvents.Event) {
            const index = this.events.indexOf(event.id);

            if (index !== -1) {
                this.events.splice(index, 1);
                MOEvents.Event.unregisterParticipant(event, this.name);
            }
        }


        getName(){
            return this.name;
        }
    }
}




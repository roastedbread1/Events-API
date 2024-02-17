export namespace MO {
    export class Event {
        id: string;
        title: string;
        // date: Date;
        description: string;
        location: string;
        maxParticipants: number;
        participants: string[];

        constructor( title: string, description: string, location: string, maxParticipants: number, id : string) {
            this.title = title;
            // this.date = new Date(date);
            this.description = description;
            this.location = location;
            this.maxParticipants = maxParticipants;
            this.participants = [];
            this.id = id;
        }

        public static eventExist(event: Event): boolean {
            return !event.id;
        }

        public static registerParticipant(event: Event, user: string) {
            if (event.participants.length < event.maxParticipants) {
                event.participants.push(user);
            } else {
                throw new Error('Event is full');
            }
        }

        public static unregisterParticipant(event: Event, user: string) {
            const index = event.participants.indexOf(user);
            if (index !== -1) {
                event.participants.splice(index, 1);
            } else {
                throw new Error('User not found');
            }
        }
    }
}

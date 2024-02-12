export namespace MO {
    export class Event {
        id: string;
        title: string;
        date: Date;
        description: string;
        location: string;
        maxParticipants: number;
        participants: string[];

        constructor(id: string, title: string, date: Date, description: string, location: string, maxParticipants: number) {
            this.id = id;
            this.title = title;
            this.date = date;
            this.description = description;
            this.location = location;
            this.maxParticipants = maxParticipants;
            this.participants = [];
        }

        public static eventExist(event: Event): boolean {
            return !!event.id;
        }

        public static registerParticipant(event: Event, user: string) {
            if (event.participants.length < event.maxParticipants) {
                event.participants.push(user);
            }
        }

        public static unregisterParticipant(event: Event, user: string) {
            const index = event.participants.indexOf(user);
            if (index !== -1) {
                event.participants.splice(index, 1);
            }
        }
    }
}

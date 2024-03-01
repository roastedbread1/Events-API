export namespace MO {
    export class Event {
        //inisialisasi variabel
        id: string;
        title: string;
        // date: Date;
        description: string;
        location: string;
        maxParticipants: number;
        participants: string[];
        
        // constructor buat ngisi variabel
        constructor( title: string, description: string, location: string, maxParticipants: number, id : string) {
            this.title = title;
            // this.date = new Date(date);
            this.description = description;
            this.location = location;
            this.maxParticipants = maxParticipants;
            this.participants = [];
            this.id = id;
        }

        // nyari event, kalo id nya ga ada, return false.
        public static eventExist(event: Event): boolean {
            return !event.id;
        }
        // register peserta, ambil Event dan user
        public static registerParticipant(event: Event, user: string) {
            // kalo peserta kurang dari max, push user ke participants
            if (event.participants.length < event.maxParticipants) {
                event.participants.push(user);
            } else {
                throw new Error('Event is full');
            }
        }
        // unregister peserta, ambil Event dan user
        public static unregisterParticipant(event: Event, user: string) {
            // cari index user di participants, kalo ada, hapus
            const index = event.participants.indexOf(user);
            if (index !== -1) {
                event.participants.splice(index, 1);
            } else {
                throw new Error('User not found');
            }
        }
    }
}

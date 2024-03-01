import { MO as MOEvents } from '../models/events';

export namespace MO {
    export class User {

        //inisialisasi variabel
        id: string;
        name: string;
        email: string;
        password: string;
        events: string[];
// constructor buat ngisi variabel  
        constructor(id: string, name: string, email: string, password: string) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.password = password;
            this.events = [];
        }
// register event, ambil event
        registerForEvent(event: MOEvents.Event) {
            //cari event nya ada pa gk
            if (MOEvents.Event.eventExist(event)) {
                //push event ke array events nya user buat nyimpen event yang diikuti
                this.events.push(event.id);
                //panggil fungsi registerParticipant dari class Event masukin parameter event dan this.name
                MOEvents.Event.registerParticipant(event, this.name);
            }
        }

        unregisterFromEvent(event : MOEvents.Event) {
            //cari index event di array events nya user
            const index = this.events.indexOf(event.id);
            //kalo ada, hapus event dari array events nya user
            if (index !== -1) {
                this.events.splice(index, 1);
                //panggil fungsi unregisterParticipant dari class Event masukin parameter event dan this.name
                MOEvents.Event.unregisterParticipant(event, this.name);
            }
        }


        getName(){
            //return nama nya user
            return this.name;
        }
    }
}




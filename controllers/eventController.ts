import { MO as MOEvents } from '../models/events';
import { Request, Response } from 'express';
//bikin array buat nyimpen event
const events: MOEvents.Event[] = [];

const { v4: uuidv4, validate: validateUUID } = require('uuid');

import {users as users} from '../controllers/userController';
    //bikin event
   export const createEvent = (req: Request, res: Response) => {
        // request parameter yang ada di class Event
        const { title, description, location, maxParticipants } = req.body;
        //id nya di generate
        const id = uuidv4();


        console.log(req.body);
        // bikin objek even baru pake yang di request tadi
        const newEvent = new MOEvents.Event(title,description, location, maxParticipants, id);
        //push ke array event
        events.push(newEvent);
        //kirim response
        res.status(201).json(newEvent);
        //buat nge tes blm diapus
        console.log(events[0].title)
    };
    //get semua event
    export const getEvents = (req: Request, res: Response) => {
        //kirim response semua events yang ada di array events
        res.status(200).json(events);
    };
    
 export const getEventByID =(req: Request, res: Response) => {
        //request ID
        const eventID = req.params.id;
        //cari event yang id nya sama dengan eventID
        const event = events.find(event => event.id === eventID);
        //kalo ga ada, response 404
        if(!event){
            res.status(404).send('Event not found');
            return;
        }
        //kalo ada, response 200 sama event nya
        res.status(200).json(event);


    };

   export const  updateEvent = (req: Request, res: Response) => {
        const id = req.params.id;
        if (!validateUUID(id)) {
            res.status(400).send('Invalid UUID');
            return;
        }

        const { title, date, description, location, maxParticipants } = req.body;
        const event = events.find(event => event.id === String(id));
        if (event) {
            event.title = title;
            // event.date = date;
            event.description = description;
            event.location = location;
            event.maxParticipants = maxParticipants;
            res.status(200).json(event);
        } else {
            res.status(404).send('Event not found');
        }
    };

  export const   deleteEvent = (req: Request, res: Response) => {
        const id = req.params.id;

        if (!validateUUID(id)) {
            res.status(400).send('Invalid UUID');
            return;
        }

        const index = events.findIndex(event => event.id === id);
        if (index !== -1) {
            events.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send('Event not found');
        }
    };
export const registerForEvent = (req: Request, res: Response) => {
const {eventID, userID} = req.body;

const event = events.find(event => event.id === eventID);
if(!event){
    res.status(404).send('Event not found');
    return;
}

const user = users.find(user => user.id === userID);

if(!user){
    res.status(404).send('User not found');
    return;

}

user.registerForEvent(event);

}

export const unregisterFromEvent = (req: Request, res: Response) => {
    const {eventId, userID} = req.body;
    const event = events.find(event => event.id === eventId);
    if(!event){
        res.status(404).send('Event not found');
        return;
    }

    const user = users.find(user => user.id === userID);

    if(!user){
        res.status(404).send('User not found');
        return;

    }

    user.unregisterFromEvent(event);

}

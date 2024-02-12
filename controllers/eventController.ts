import { MO as MOEvents } from '../models/events';
import { Request, Response } from 'express';

const events: MOEvents.Event[] = [];
const { v4: uuidv4, validate: validateUUID } = require('uuid');



   export const createEvent = (req: Request, res: Response) => {
        const { title, date, description, location, maxParticipants } = req.body;
        const id = uuidv4();
        if (!title || !date || !description || !location || !maxParticipants) {
            res.status(400).send('Missing required information');
            return;
        }
        const newEvent = new MOEvents.Event(id, title, date, description, location, maxParticipants);
        events.push(newEvent);
        res.status(201).json(newEvent);
    };

   export const  getEvents = (req: Request, res: Response) => {
        res.status(200).json(events);
    };

 export const getEventByID =(req: Request, res: Response) => {
        const id = req.params.id;
        const event = events.find(event => event.id === id);
        if (event) {
            res.status(200).json(event);
        } else {
            res.status(404).send('Event not found');
        }
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
            event.date = date;
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




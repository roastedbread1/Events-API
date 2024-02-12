import express from 'express';
import { createEvent, getEvents, getEventByID, updateEvent, deleteEvent } from '../controllers/eventController';

const eventRouter = express.Router();

eventRouter.post('/create', createEvent);
eventRouter.get('/', getEvents);
eventRouter.get('/:id', getEventByID);
eventRouter.put('/:id', updateEvent);
eventRouter.delete('/:id', deleteEvent);

export { eventRouter };

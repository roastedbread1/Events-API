import express from 'express';
import { createEvent, getEvents, getEventByID, updateEvent, deleteEvent, registerForEvent, unregisterFromEvent } from '../controllers/eventController';

const eventRouter = express.Router();

eventRouter.post('/create', createEvent);
eventRouter.get('/', getEvents);
eventRouter.get('/:id', getEventByID);
eventRouter.put('/:id', updateEvent);
eventRouter.delete('/:id', deleteEvent);
eventRouter.post('/register', registerForEvent );
eventRouter.put('/unregister', unregisterFromEvent)


export { eventRouter };

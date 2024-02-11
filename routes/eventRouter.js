const express = require('express');

const eventRouter = express.Router();

const EventController = require('../controllers/eventController');

eventRouter.post('/', EventController.createEvent);

eventRouter.get('/', EventController.getEvents);

eventRouter.get('/:id', EventController.getEventByID);

eventRouter.put('/:id', EventController.updateEvent);

eventRouter.delete('/:id', EventController.deleteEvent);

module.exports = eventRouter;

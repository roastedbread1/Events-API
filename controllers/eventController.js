const Event = require('./models/events');

const Events = [];
const {v4 : uuidv4, validate : validationUuid} = require('uuid');

const EventController = {

    createEvent: (req, res) => {
        const { title, date, description, location, maxParticipants } = req.body;
        const id = uuidv4();
        if(!title || !date || !description || !location || !maxParticipants){
            res.status(400).send('Missing required information');
            return;
        }
        const newEvent = new Event(id, title, date, description, location, maxParticipants);
        events.push(newEvent);
        res.status(201).json(newEvent);
    }, 

    getEvents: (req, res) => {

        res.status(200).json(events);

    },

    getEventByID: (req, res) => {
        const id = req.params.id;
        const event = events.find(event => event.id === id);
        if(event){
            res.status(200).json(event);
        } else {
            res.status(404).send('Event not found');
        }
    },

    updateEvent: (req, res) => {
        const id = req.params.id;
        if(!validateUUID(id)){
            res.status(400).send('Invalid UUID');
            return;
        }

        const { title, date, description, location, maxParticipants } = req.body;
        const event = events.find(event => event.id === id);
        if(event){
            event.title = title;
            event.date = date;
            event.description = description;
            event.location = location;
            event.maxParticipants = maxParticipants;
            res.status(200).json(event);
        } else {
            res.status(404).send('Event not found');
        }
    }, 

    deleteEvent: (req, res) => {
        const id = req.params.id;

        if(!validateUUID(id)){
            res.status(400).send('Invalid UUID');
            return;
        }

        const index = events.findIndex(event => event.id === id);
        if(index !== -1){
            events.splice(index, 1);
            res.status(204).send();
        } else {
            res.status(404).send('Event not found');
        }
    }
}

module.exports = EventController;
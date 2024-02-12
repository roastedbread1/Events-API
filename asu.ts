import { MO } from './models/events';

// Create an instance of the Event class
const sampleEvent = new MO.Event(
    'Sample Event',
    'This is a test event',
    'Test Location',
    50,
    'b5273180-11d6-4ff1-9eb9-13775d937de3'
);

// Log the properties of the created instance
console.log('Event ID:', sampleEvent.id);
console.log('Event Title:', sampleEvent.title);
console.log('Event Description:', sampleEvent.description);
console.log('Event Location:', sampleEvent.location);
console.log('Event Max Participants:', sampleEvent.maxParticipants);
console.log('Event Participants:', sampleEvent.participants);

// Check if the event exists
console.log('Does the event exist?', MO.Event.eventExist(sampleEvent));

// Register a participant
MO.Event.registerParticipant(sampleEvent, 'Participant1');
console.log('Event Participants after registration:', sampleEvent.participants);

// Unregister a participant
MO.Event.unregisterParticipant(sampleEvent, 'Participant1');
console.log('Event Participants after unregistration:', sampleEvent.participants);

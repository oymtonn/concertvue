import React from 'react';
import { useState, useEffect } from 'react';
import Event from '../components/Event';
import '../css/Events.css';

const Events = () => {

  const [events, setEvents] = useState([]);

  useEffect(() => {
      const getAllEvents = async () => {
      const res = await fetch('http://localhost:3001/events');
      const data = await res.json();

      setEvents(data);
    }
    getAllEvents();
  }, [])


 return (
  <div className="events-page">
    <br></br><br></br>
    <h1>Events Page</h1>
    <br></br><br></br>
    {events && events.length > 0 ? (
      <div className="events-container">
        {events.map((event) => (
          <Event
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            time={event.time}
            image={event.image}
          />
        ))}
      </div>
    ) : (
      <h2>
        <i className="fa-regular fa-calendar-xmark fa-shake"></i>{' '}
        No events scheduled at this location yet!
      </h2>
    )}
  </div>
);

};

export default Events;

export const getEventById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/events/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching event:', err);
    throw err;
  }
};

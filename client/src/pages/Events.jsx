import React from 'react';

const Events = () => {
  return (
    <div>
      <h1>Events Page</h1>
    </div>
  );
};

export default Events;

export const getEventsById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/events/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error fetching event:', err);
    throw err;
  }
};

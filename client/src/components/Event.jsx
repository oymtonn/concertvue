import React, { useState, useEffect } from 'react';
import '../css/Event.css';
import { getEventById } from '../pages/Events';

const Event = (props) => {

    const [event, setEvent] = useState([])
    const [time, setTime] = useState([])

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString([], { 
        weekday: 'short',   // e.g., "Mon"
        month: 'short',     // e.g., "Oct"
        day: 'numeric',     // e.g., "7"
        year: 'numeric'     // e.g., "2025"
        });
    };


    useEffect(() => {
        (async () => {
            try {
                const eventData = await getEventById(props.id)
                setEvent(eventData)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                const result = formatTime(event.time)
                setTime(result)
            }
            catch (error) {
                throw error
            }
        }) ()
    }, [event])


    return (
        <article className='event-information'>
            <img src={event.image} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{event.name}</h3>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {formatDate(event.time)} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>${event.pricepoint}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
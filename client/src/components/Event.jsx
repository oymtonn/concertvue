import React, { useState, useEffect } from 'react';
import '../css/Event.css';
import { getEventsById } from '../pages/Events';

const Event = (props) => {

    const [event, setEvent] = useState([])
    const [time, setTime] = useState([])
    const [remaining, setRemaining] = useState([])

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatRemainingTime = (futureDate) => {
        const diff = new Date(futureDate) - new Date();
        const mins = Math.floor(diff / 60000);
        return mins > 0 ? `${mins} minutes left` : 'Expired';
    };


    useEffect(() => {
        (async () => {
            try {
                const eventData = await getEventsById(props.id)
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

    useEffect(() => {
        (async () => {
            try {
                const timeRemaining = formatRemainingTime(event.remaining)
                setRemaining(timeRemaining)
                formatNegativeTimeRemaining(remaining, event.id)
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
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {event.date} <br /> {time}</p>
                    <p id={`remaining-${event.id}`}>${event.pricepoint}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
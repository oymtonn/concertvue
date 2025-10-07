import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'

    export const getAllLocations = async () => {
        try {
            const res = await fetch('http://localhost:3001/locations');
            const data = await res.json();
            return data;
        }
        catch (err){
                console.log(err);
        }
    }

const LocationEvents = ({index}) => {
    const [location, setLocation] = useState({})
    const [events, setEvents] = useState([])


    useEffect(() => {
        const locationId = Number(index);

        if (isNaN(locationId)) return;

        const getLocationAndEvents = async () => {
            try {
                const locations = await getAllLocations();
                const response = await fetch(`http://localhost:3001/events?location_id=${locationId}`);
                const data = await response.json();

                setLocation(locations.find((loc) => Number(loc.id) === locationId));
                setEvents(data);
            }
            catch (err){
                console.log(err);
            }
        }

        getLocationAndEvents();
        
    }, [index]);

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    {/* <img src={location.image} /> */}
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event, index) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents
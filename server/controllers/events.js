import { pool } from '../config/database.js';

// returns events based on their location id, can be multiple events returned

export const getEvents = async (req, res) => {
  try {
    // look for location_id in query
    // http://localhost:3001/events?location_id=2 would return all with loc id 2
    const { location_id } = req.query;
    let results;

    if (location_id) {
      results = await pool.query(
        'SELECT * FROM events WHERE location_id = $1 ORDER BY id ASC',
        [location_id]
      );
    } else {
      results = await pool.query('SELECT * FROM events ORDER BY id ASC');
    }

    res.status(200).json(results.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: err.message });
  }
};

// returns events on THEIR actual id, not location. so it will return only one event

export const getEventsById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid event ID' });
    }

    const results = await pool.query('SELECT * FROM events WHERE id = $1', [id]);

    if (results.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(results.rows[0]);
  } catch (err) {
    console.error('Error fetching event by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

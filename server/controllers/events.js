import { pool } from '../config/database.js';

export const getEvents = async (req, res) => {
  try {
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

    // ✅ send back the result to the client
    res.status(200).json(results.rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: err.message });
  }
};

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

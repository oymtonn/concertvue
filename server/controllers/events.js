import { pool } from '../config/database.js';

const getEvents = async () => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC');
        res.status(200).json(results.rows);
    }
    catch (err){
        res.status(409).json({error: error.message});
    }
}

export default {getEvents};
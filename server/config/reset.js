import { pool } from './database.js';
import eventData from '../data/eventdata.js';
import locationData from '../data/locationdata.js';

console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD type:', typeof process.env.PGPASSWORD);
console.log('PGHOST:', process.env.PGHOST);

const createTables = async () => {
  try {
    await pool.query(`DROP TABLE IF EXISTS events`);
    await pool.query(`DROP TABLE IF EXISTS locations`);

    await pool.query(`
      CREATE TABLE locations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

    await pool.query(`
      CREATE TABLE events (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        pricePoint VARCHAR(10) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        location_id INTEGER REFERENCES locations(id)
      )
    `);

    console.log('Tables created successfully');
  } catch (err) {
    console.log(err);
  }
};

const seedLocationsTable = async () => {
  for (const location of locationData) {
    await pool.query(`INSERT INTO locations (name) VALUES ($1)`, [location.name]);
    console.log(`${location.name} inserted`);
  }
};

const seedEventsTable = async () => {
  for (const event of eventData) {
    await pool.query(
      `INSERT INTO events (name, location, pricePoint, image, description, location_id) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        event.name,
        event.location,
        event.pricePoint,
        event.image,
        event.description,
        event.location_id
      ]
    );
    console.log(`${event.name} added`);
  }
};

const resetDatabase = async () => {
  await createTables();
  await seedLocationsTable();
  await seedEventsTable();
  console.log('Database seeded!');
  await pool.end();
};

resetDatabase();

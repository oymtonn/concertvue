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
        location_id INTEGER REFERENCES locations(id),
        time TIMESTAMP NOT NULL
      )
    `);

    console.log('Tables created successfully');
  } catch (err) {
    console.log(err);
  }
};

const seedLocationsTable = async () => {
  for (const location of locationData) {
    // columns, followed by data you want stored inside the $x
    await pool.query(`INSERT INTO locations (name) VALUES ($1)`, [location.name]);
    console.log(`${location.name} inserted`);
  }
};

const seedEventsTable = async () => {
  for (const event of eventData) {
    // $x represents the different columns within the table
    await pool.query(
      `INSERT INTO events (name, location, pricePoint, image, location_id, time) 
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        event.name,
        event.location,
        event.pricePoint,
        event.image,
        event.location_id,
        event.time
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

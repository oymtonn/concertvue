import dotenv from 'dotenv';
dotenv.config();

console.log('PGUSER:', process.env.PGUSER);
console.log('PGPASSWORD type:', typeof process.env.PGPASSWORD);
console.log('PGHOST:', process.env.PGHOST);

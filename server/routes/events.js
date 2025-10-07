import { getEvents, getEventsById } from '../controllers/events.js';
import express from 'express';

const router = express.Router();

router.get('/', getEvents);
router.get('/:id', getEventsById);

export default router;

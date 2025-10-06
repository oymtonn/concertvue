import EventsController from '../controllers/events.js';
import express  from 'express';

const router = express.Router();

router.get('/', EventsController.getEvents);

export default router;
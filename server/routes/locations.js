import LocationsController from '../controllers/locations.js';
import express from 'express';

const router = express.Router();

router.get('/', LocationsController.getLocations);

export default router;
import express from 'express';
import controller  from '../controller/index.js';

const router = express.Router();

router.get('/allProperties', controller.getAllProperties );
router.post('/addProperty', controller.addProperty);
router.delete('/deleteProperty/:id', controller.deleteProperty);

export default router;
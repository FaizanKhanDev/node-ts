import express from 'express';
import authController from '../../controllers/auth';

/* ====== Initialize the Routes ====== */
const router = express.Router();



/* ====== Routes ====== */
router.post('/register', authController.userRegistration);
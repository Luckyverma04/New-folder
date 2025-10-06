import { Router } from 'express';
import { signup, login, getProfile, verifyEmail } from '../controllers/user.controller';
import { validateSignup, validateLogin, handleValidationErrors } from '../middleware/validation.middleware';

const router = Router();

router.post('/signup', validateSignup, handleValidationErrors, signup);
router.post('/login', validateLogin, handleValidationErrors, login);
router.post('/verify-email', verifyEmail);
router.get('/profile', getProfile);

export default router;
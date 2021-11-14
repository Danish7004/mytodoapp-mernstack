import express from 'express';

//component import
import userCntrl from '../controllers/userCntrl.js';
import auth from '../middlewares/auth.js';

export const router = express.Router();

router.post('/register', userCntrl.register);
router.post('/login', userCntrl.login);

router.get('/logout', userCntrl.logout);
router.get('/refresh_token', userCntrl.refreshToken);
router.get('/info', auth, userCntrl.getUser);

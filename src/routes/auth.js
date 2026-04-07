import express from "express";
import {signup,login,myProfile,logout} from '../controller/auth.controller.js';
import { jwtMiddleWare } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.get('/profile',jwtMiddleWare,myProfile);
router.post('/logout',jwtMiddleWare,logout);

export default router;
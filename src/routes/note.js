import express from 'express';
import { addNote,listNote,updateNoteText,deleteNoteText,deleteNoteImage } from '../controller/note.controller.js';
import { jwtMiddleWare } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/add',upload.single('noteImage'),jwtMiddleWare,addNote);
router.get('/list',jwtMiddleWare,listNote);
router.put('/updateText/:id',jwtMiddleWare,updateNoteText);
router.put('/deleteNoteText/:id',jwtMiddleWare,deleteNoteText);
router.put('/deleteNoteImage/:id',jwtMiddleWare,deleteNoteImage);

export default router;
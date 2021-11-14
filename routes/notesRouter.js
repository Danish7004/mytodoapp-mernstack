import express from 'express';

//component import 
import auth from '../middlewares/auth.js';
import authAdmin from '../middlewares/authAdmin.js';
import notesCntrl from '../controllers/notesCntrl.js';

export const notesRouter = express.Router();

notesRouter.route('/notes')
    .get(notesCntrl.getNoteList)
    .post(auth, authAdmin, notesCntrl.createNoteList)

notesRouter.route('/notes/:id')
    .delete(auth, authAdmin, notesCntrl.deleteNoteList)
    .put(auth, authAdmin, notesCntrl.updateNoteList)    
import mongoose from 'mongoose';

const notesSchema = new mongoose.Schema({
    noteList_id :{
        type: String,
        required:true,
        trim:true,
        unique:true,
    },
    title :{
        type: String,
        required:true,
        trim:true,
    },
    description :{
        type: String,
        required:true,
    },
},{timestamps:true});

const NoteList = mongoose.model('notes', notesSchema)

export default NoteList;
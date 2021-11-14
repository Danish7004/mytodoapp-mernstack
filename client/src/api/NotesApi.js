import {useState, useEffect } from 'react';
import axios from 'axios';

function NotesApi(props) {
    const [notes, setNotes] = useState([])
    const [callback, setCallback ] = useState(false);


    useEffect(()=>{

    const getNotes = async() =>{
        const res = await axios.get('/api/notes')
        // console.log(res)
        setNotes(res.data.noteList);
        
    }
        getNotes()
    }, [callback, setCallback])

    return {

        notes: [notes, setNotes],
        callback: [callback, setCallback ],
    };
}

export default NotesApi;
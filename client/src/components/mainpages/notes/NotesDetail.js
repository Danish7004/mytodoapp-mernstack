import React, {useContext, useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

function NotesDetail(props) {
    const params = useParams()
    const state = useContext(GlobalState);
    const [notes] = state.notesApi.notes;
    const [noteDetail, setNoteDetail] = useState([])

    useEffect(()=>{
        if(params.id){
            notes.forEach(note => {
                if(note._id === params.id) setNoteDetail(note)
            });
        }
    }, [params.id, notes])   

    // console.log(params)
    // console.log(detailProduct);


    if(noteDetail.length === 0) return null;
   
    
    return (
        <>
    
            <div className="box">
            <div className="box-detail">
                <div className = "row">
                    <h2>{noteDetail.title}</h2>
                </div>
                <p>{noteDetail.description}</p>
            </div>
            </div>

  </>
     )
    
    
}

export default NotesDetail;
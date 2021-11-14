import React, {useContext} from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import NoteList from './NoteList';


function Notes(){
    const state = useContext(GlobalState)
    const [token] = state.token
    const [callback, setCallback ] = state.notesApi.callback;
    // console.log(state);
    const [notes] = state.notesApi.notes
    // console.log(notes)
    const [isAdmin] = state.userApi.isAdmin


    const deleteNote = async(id) =>{
        try {
            if(isAdmin){
            await axios.delete(`/api/notes/${id}`, {
                headers: { Authorization: token}
            })
                setCallback(!callback)
        }
            
        } catch (err) {
            alert(err.response.msg)
        }
              }    

    // if(loading) return <div><Loading/></div>

    return(
        <>     

        <div className="products">
            <div className="todo_heading">
            <h1>TODO LIST</h1>
            </div>
                
            {
                notes.map(note => {
                    return  <NoteList key={note._id} note={note} isAdmin={isAdmin}
                    deleteNote={deleteNote}  />
                             
                       
                })
            }
        </div>
        </>
    )
}

export default Notes;
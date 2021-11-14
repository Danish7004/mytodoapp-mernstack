import React,{useContext, useState, useEffect} from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';
import {useHistory,useParams} from 'react-router-dom'

const initialState ={
    noteList_id: "",
    title: "",
    description:"",
    _id:""
}



function CreateAndUpdateNotes(props) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userApi.isAdmin
    const [token] = state.token
    const [callback, setCallback ] = state.notesApi.callback;

    const [note, setNote] = useState(initialState)

    const params = useParams()
    const history = useHistory()

    const [onEdit, setOnEdit] = useState(false)
    const [notes] = state.notesApi.notes

    useEffect(()=>{
        // if(!isAdmin) return alert('This is only Admin access')
        if(params.id){
            setOnEdit(true)
            notes.forEach(note =>{
                if(note._id === params.id) {
                setNote(note)
                  }   
            })
           
        }else{
            setOnEdit(false)
            setNote(initialState)
        }
    }, [params.id, isAdmin, notes])

    const onchangeInput = e =>{
        const {name, value} = e.target
        setNote({...note, [name]: value})
        // console.log(product)
    }

    const handleSubmit = async(e) =>{
        e.preventDefault()
        try {

            if(onEdit){
                await axios.put(`/api/notes/${note._id}`, {...note}, {
                    headers: { Authorization: token}
                })
                setCallback(!callback)
            }else{
                await axios.post('/api/notes', {...note}, {
                    headers: { Authorization: token}
                })
                setCallback(!callback)
            }
            
            setNote(initialState)
            history.push("/")

        } catch (err) {
            alert(err.response.data.msg)
        }
    }



    return (
        <div className="margin">
        <div className="create_product">

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="noteList_id">Notes ID</label>
                    <input type="text" name="noteList_id" id="noteList_id" required 
                    value={note.noteList_id} onChange={ (e)=> onchangeInput(e)} disabled={onEdit}/>
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                     value={note.title} onChange={ (e)=> onchangeInput(e)} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                     value={note.description} rows="13" onChange={ (e)=> onchangeInput(e)}/>
                </div>

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
                
            </form>
            
        </div>
        </div>

        
    );
}

export default CreateAndUpdateNotes;
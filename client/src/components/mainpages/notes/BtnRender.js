import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';


function BtnRender({note, deleteNote}) {
    const state = useContext(GlobalState);
    const [isAdmin] = state.userApi.isAdmin
   

   

    return (
        <>
        <div className='row_btn'>
            {
                isAdmin ?
                <>
                  <Link id='btn-view' to={`/detail/${note._id}`}>
                    <button>View</button>
                </Link>

                <Link to='#!' onClick={() => deleteNote(note._id)}>
                    <button id='btn-buy'>Delete</button>
                 </Link>

                <Link  to={`/update_note/${note._id}`}>
                <button id='btn-edit'>Edit</button>    
                </Link>
            </> :
             <>
                <Link id='btn-view' to={`/detail/${note._id}`}>
                    <button>View</button>
                </Link>
                </>
            }
                

            </div>
            </>
    );
}

export default BtnRender;
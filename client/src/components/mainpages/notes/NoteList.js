import React from 'react';
import BtnRender from './BtnRender';



function NoteList({note, deleteNote}) {
    

    return (
        <>   
        

            <div className="row_card">

                   <div className="product_box">
                                 <h2 title={note.title}> {note.title}</h2>
                         </div> 

            <BtnRender note={note} deleteNote={deleteNote} />
            
            </div>
        
        </>
    );
}

export default NoteList;
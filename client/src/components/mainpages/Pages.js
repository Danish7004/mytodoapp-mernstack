import React from 'react';
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login';
import Register from './auth/Register';
import Notes from './notes/Notes';
import NotesDetail from './notes/NotesDetail';
import CreateAndUpdateNotes from './notes/CreateAndUpdateNotes';


function pages(props) {
    return (
        <Switch>
            <Route exact path='/' component={Notes}  />
            <Route exact path='/detail/:id' component={NotesDetail}  />
            <Route exact path='/login' component={Login}  />
            <Route exact path='/register' component={Register}  />
            <Route exact path='/create_note' component={CreateAndUpdateNotes}  />
            <Route exact path='/update_note/:id' component={CreateAndUpdateNotes}  />
            
        </Switch>
    );
}

export default pages;
import React, {useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
//components import
import { GlobalState } from '../../GlobalState';


function Header(props) {
    const state = useContext(GlobalState)
    // console.log(state) 
        const [isLogged] = state.userApi.isLogged
        const [isAdmin] = state.userApi.isAdmin

    const logoutUser = async() =>{
        await axios.get('/user/logout')
        localStorage.clear()
        // setIsAdmin(false)
        // setIsLogged(false)
            //OR
      window.location.href = "/";
    }

    const adminRouter = () =>{
        return(
            <>
            <li><Link to = '/create_note'>Create Notes</Link></li>
            </>
        )
    };

    const loggedRouter = () =>{
        return(
            <>
            <li><Link to = '/' onClick={logoutUser}> Logout</Link></li>
            </>
        )
    };

    return (
        <header>

            <div className='logo'>
                <h1>
                    <Link to='/'> {isAdmin ? "Admin" : "Notes App"}</Link>
                </h1>
            </div>

            <ul>
                <li><Link to='/'> Notes </Link></li>

                {isAdmin && adminRouter()}
                {
                    isLogged ? loggedRouter() : <li><Link to='/login'>Login or Register</Link></li>
                }
            </ul>
           
        </header>
    );
}

export default Header;
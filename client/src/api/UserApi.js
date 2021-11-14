import axios from 'axios';
import {useState, useEffect} from 'react';

function UserApi(token) {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(()=>{

        if(token){
            const getUser = async() =>{

                try {
                    const res = await axios.get('/user/info', {
                        headers: {Authorization: token}
                    })
                        setIsLogged(true)
                        res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)

                } catch (err) {
                    alert(err.data)
                }

            }
            getUser();
        };
        
    }, [token]);


    return (
        {
            //HERE we are passing it to the otherfiles..
            isLogged:[isLogged, setIsLogged],
            isAdmin:[isAdmin, setIsAdmin],
        
        });
}

export default UserApi;
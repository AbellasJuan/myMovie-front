import { React, useState } from 'react';
import '../../styles/header.css';
import useUserInfo from '../../hooks/useUserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import {BiExit} from 'react-icons/bi';
import {FaUserFriends} from 'react-icons/fa';
import api from "../../services/api.js"

export default function Header({black}){
    const { user } = useUserInfo();
    const { fillUser } = useUserInfo();
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation(); 
    const [listOfUsers, setListOfUsers] = useState([]);
    
    function logout(){
        login('')
        fillUser('')
        localStorage.clear()
        navigate('/');
    };

    async function searchUsers(userName){
        try{
           if(userName === '') {
                setListOfUsers([])
           }else{
                const {data} = await api.getUsers(userName);
                setListOfUsers(data)
           }
        }catch (error) {
            let errorMessage = (error);
            console.log(errorMessage)
        };
    };

    function goToUserPage(friendId){
        setListOfUsers([])
        navigate(`/reviews/${user.id}?friendId=${friendId}`)
    };

    return(
        <div className={black ? "header-top black" : "header-top"}>
            <strong onClick={() => navigate('/home')}>CINE.ME</strong> 
            { location.pathname !== "/" && <div className='search-bar'>
                <input
                    className='header-input'
                    placeholder="Veja as críticas de outras pessoas"
                    type="search"
                    name="search"
                    onChange={(e) => searchUsers(e.target.value)}
                    required
                />
                <div className='list-users'>
                    {listOfUsers?.map((user, index) => <p key={index} onClick={() => goToUserPage(user?.id)}>{user?.userName}</p> 
                    )}
                </div>
            </div>}
            <div className="header-user">
              
                <span onClick={() => navigate(`/reviews/${user?.id}`)} >{user ? user.userName : ''}</span>
                    <div onClick={() => navigate(`/reviews/${user?.id}`)} >
                        {user?.userName && <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="Usuario" />}
                    </div>
                    <div className="logout-icon" onClick={() => searchUsers()}>{user?.userName && <FaUserFriends/>}</div>
                    <div className="logout-icon" onClick={() => logout()}>{user?.userName && <BiExit/>}</div>
            </div>
        </div>
    );
};
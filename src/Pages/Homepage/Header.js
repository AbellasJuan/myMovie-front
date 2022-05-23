import { React } from 'react';
import '../../styles/header.css';
import useUserInfo from '../../hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';
import {BiExit} from 'react-icons/bi';

export default function Header({black}){
    const { user } = useUserInfo();
    const { fillUser } = useUserInfo();
    const { login } = useAuth();
    const navigate = useNavigate();
    
    function logout(){
        login('')
        fillUser('')
        localStorage.clear()
        navigate('/');
    };

    return(
        <div className={black ? "header-top black" : "header-top"}>
            <strong onClick={() => navigate('/home')}>CINE.ME</strong> 
            <div className="header-user">
                <span>{user ? user.userName : ''}</span>
                    <div>
                        {user?.userName && <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="Usuario" />}
                    </div>
                    <div className="logout-icon" onClick={() => logout()}>{user?.userName && <BiExit/>}</div>
            </div>
        </div>
    );
};
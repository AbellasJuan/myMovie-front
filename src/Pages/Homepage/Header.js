import React from 'react';
import '../../styles/header.css';
import useUserInfo from '../../hooks/useUserInfo';
import { useNavigate } from 'react-router-dom';

export default function Header({black}){
    const { user } = useUserInfo();
    const navigate = useNavigate()

    return(
        <div className={black ? "header-top black" : "header-top"}>
            <strong onClick={() => navigate('/home')}>CINE.ME</strong> 
            <div className="header-user">
                <span>{user?.userName}</span>
                    <a href="/">
                        {user?.userName && <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="Usuario" />}
                    </a>
            </div>
        </div>
    );
}
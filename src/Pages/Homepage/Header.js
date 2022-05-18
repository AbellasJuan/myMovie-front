import React from 'react';
import '../../styles/header.css';

export default function Header({black}){
    return(
        <div className={black ? "header-top black" : "header-top"}>
            <strong>CINE.ME</strong> 
            
            <div className="header-user">
                <span>USERNAME</span>
                    <a href="/">
                        <img src="https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png" alt="Usuario" />
                    </a>
            </div>
            
        </div>
    );
}
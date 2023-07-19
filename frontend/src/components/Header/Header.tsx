import React from 'react';
import "./style/headerstyle.css";
import HeaderLogo from './HeaderLogo';
import NavBar from './NavBar';


function Header() {
    return (
        <header className="header">
            <HeaderLogo />
            <NavBar />
        </header>
    );
}

export default Header;

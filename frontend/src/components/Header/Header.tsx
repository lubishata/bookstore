import React from 'react';
import "./style/headerstyle.css";
import HeaderLogo from './HeaderLogo';
import AnonymousNavBar from './AnonymousNavBar';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SignUpNavBar from './SignUpNavBar';


function Header() {
    const storeState = useSelector((state: RootState) => state);
    const isUserSignIn = storeState.login.userType != "anonymousUsers";

    return (

        <header className="header">
            <HeaderLogo />
            {
                isUserSignIn
                    ?
                    <AnonymousNavBar />
                    :
                    <SignUpNavBar />
            }
        </header>
    );
}

export default Header;

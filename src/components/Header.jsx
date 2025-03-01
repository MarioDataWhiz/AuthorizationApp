import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useAuthContext } from '@asgardeo/auth-react';
import { Button } from '@mui/material';

const Header = () => {
    const { userName } = useContext(UserContext);
    const { state, signIn, signOut } = useAuthContext();

    const handleSignIn = () => {
        console.log("Sign In button clicked");
        signIn();
    };

    const handleSignOut = () => {
        console.log("Sign Out button clicked");
        signOut();
    };

    return (
        <header id="header">
            <div className="header-title">
                <h1>Welcome <u>{userName}</u> to the CodeCraft Labs Intranet</h1>
            </div>
            <nav className="header-nav">
                <ul>
                    <li><NavLink to="/" className="nav-link">Home</NavLink></li>
                    <li><NavLink to="/employee-management" className="nav-link">Employee Management</NavLink></li>
                </ul>
                {state.isAuthenticated ? (
                    <Button color="inherit" onClick={handleSignOut}>
                        Sign Out
                    </Button>
                ) : (
                    <Button color="inherit" onClick={handleSignIn}>
                        Login
                    </Button>
                )}
            </nav>
        </header>
    );
};

export default Header;
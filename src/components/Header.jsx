import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Header = () => {
    const { userName } = useContext(UserContext);

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
            </nav>
        </header>
    );
};

export default Header;
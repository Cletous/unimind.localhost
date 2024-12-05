import React from 'react';
import { Link } from "react-router-dom";
import logo from '../images/branding/white-logo.png'

const Navbar = () => {
    return (
        <div>
            <nav className="main-nav">
                <Link to="/" className="logo">
                    <img src={logo} alt="" />
                </Link>

                <ul className="main-menu">
                    <li><Link to="/" className="menu-link">Home</Link></li>
                </ul>
                <div>
                <Link to="/profile" className="nav-button">Profile</Link>
                <Link to="/logout" className="nav-button">Logout</Link>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
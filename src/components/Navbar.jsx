import React from 'react';
import { Link } from 'react-scroll';
import logo from '../images/branding/black-logo.png'

const Navbar = () => {
    return (
        <div>
            <nav className="main-nav">
                <Link to="main" className="logo">
                    <img src={logo} alt="" />
                </Link>

                <ul className="main-menu">
                    <li><Link to="main" className="active">Home</Link></li>
                    <li><Link to="about" className="active">About Us</Link></li>
                    <li><Link to="contact" className="active">Contact Us</Link></li>
                    <li><Link to="auth" className="active">Register/Login</Link></li>
                </ul>
                <Link to="#" className="nav-button">Login</Link>
            </nav>
        </div>
    );
}

export default Navbar;

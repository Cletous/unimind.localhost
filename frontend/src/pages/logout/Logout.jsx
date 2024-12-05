import { renderHook } from "@testing-library/react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const LOGOUT_URL = '/auth/logout';

const Logout = () => {

    const logoutUser = async (e) => {
        e.preventDefault();
        
        axios.post('http://localhost:8800/api/auth/logout').then(response=>console.log(response))
        .catch(err=>console.log(err.message));
    } 

    return (
        <section className="auth-section">
                <h1 className="centered">Logout</h1>
                
                <button onClick={logoutUser}>Logout</button>
            </section>
    )
}

export default Logout;
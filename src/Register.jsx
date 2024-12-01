import { renderHook } from "@testing-library/react";
import { useRef, useState, useEffect } from "react";

const EMAIL_REGEX = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{4,24}$/;

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);
    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
    }, [pwd]);

    useEffect(() => {
        setErrMsg();
    }, [email, pwd]);

    const registerUser = async (e) => {
        e.preventDefault();
        setSuccess(true);
    } 

    return (
        <>
        {success ? (
            <section>
                <h1 className="centered">Success!</h1>
                <p className="centered">
                    <a className="login-button" href="#">Login</a>
                </p>
            </section>
        ) : (
            <section className="auth-section">
                <p ref={errRef} className={errMsg ? "errmsg" : "hidden"} aria-live="assertive">{errMsg}</p>
                <h1 className="centered">Register</h1>
                <form onSubmit={registerUser} className="auth-form">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text"
                        id="email"
                        ref={userRef} 
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-invalid={validEmail ? "false" : "true"}
                        aria-describedby="emailnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)} />

                    <p id="emailnote" className={emailFocus && email && !validEmail ? "errmsg" : "hidden"}>
                        Must be a valid email address
                    </p>

                        <label htmlFor="pwd">Password</label>
                        <input 
                            type="password"
                            id="password"
                            ref={userRef} 
                            autoComplete="off"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)} />
                            
                    <p id="pwdnote" className={pwdFocus && pwd && !validPwd ? "errmsg" : "hidden"}>
                        Must have 4 to 24 characters. <br />
                        Must have at least one lowercase letter <br />
                        Must have at least one uppercase letter <br />
                        Must have a special character
                    </p>

                    <button disabled={!validEmail || !validPwd ? true : false}>Register Now</button>
                    <p>
                        <a className="auth-link" href="#">Login instead.</a>
                    </p>
                </form>
            </section>
        )}
    </>
    )
}

export default Register;

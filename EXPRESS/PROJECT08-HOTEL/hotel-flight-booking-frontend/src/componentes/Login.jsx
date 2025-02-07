import React from "react";
import './Login.css';
import { IoLockClosedOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const Login = () => {
    return (
        <div className='wrapper'>
            <div className="form-box">
                <form>
                    <h1>Log in</h1>
        
                    <div className="input-box">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            required 
                            aria-label="Username" 
                        />
                        <FaRegUser className='icon' />
                    </div>
                    <div className="input-box">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            required 
                            aria-label="Password" 
                        />
                        <IoLockClosedOutline className='icon' />
                    </div>
                    <div className="remember-forgot">
                        <label htmlFor="remember-me">
                            <input 
                                type="checkbox" 
                                id="remember-me" 
                            /> 
                            Remember me
                        </label>
                        <a href="#">forget password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="register-link">
                        Don't have an account? <a href="#">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

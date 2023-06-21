import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContextComponent';


const Login = () => {
    const { setUser } = useAuth();

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValidLogin] = useState(true);

    const onFormSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', { email, password });
        const isValid = !!data;
        setIsValidLogin(isValid);
        if (isValid) {
            navigate('/');
            setUser(data);
        }

    }

    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                {isValid ? null : <span className='text-danger'>Invalid username/password. Please try again.</span>}
                <h3>Log in to your account</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="text" name="email" placeholder="Email" className="form-control" />
                    <br />
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" name="password" placeholder="Password" className="form-control" />
                    <br />
                    <button className="btn btn-primary">Login</button>
                </form>
                <Link to="/signup">Sign up for a new account</Link>
            </div>
        </div>
    );
}

export default Login;
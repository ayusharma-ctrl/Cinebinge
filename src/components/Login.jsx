import React, { useState } from 'react'
import '../styles/Login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginErr] = useState("")
    const [loginSuccess, setLoginSucc] = useState("")
//this is to redirect user
    const navigate = useNavigate()
//this this to show toast on the websites
    const notify = (e) => toast.success(`Welcome ${e}`, {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
    });
//handles user authentication
    const handleLogin = () => {
        let userCred;
        if (email !== '' && password !== '') {
            var validator = require("email-validator");
            if (validator.validate(email)) {
                document.getElementById('loginBtn').style.display = 'none'
                document.getElementById('resetBtn').style.display = 'none'
                document.getElementById('h8').style.display = 'none'
                document.getElementById('box').style.display = 'block'
                signInWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // if entered details are valid then we send request to api
                        userCred = userCredential.user;
                        const object = { name: userCred.displayName, email: userCred.email }
                        localStorage.setItem('object', JSON.stringify(object))
                        setLoginSucc('Logging in...')
                        setLoginErr('')
                        notify(object.name)
                        setTimeout(() => {
                            navigate('/');
                        }, 2200)
                    }).catch((error) => {
                        // in case password is wrong or user dont exist, such type of errors will be handled here
                        setLoginSucc('')
                        setLoginErr(error.message.substring(10))
                        document.getElementById('loginBtn').style.display = 'block'
                        document.getElementById('resetBtn').style.display = 'block'
                        document.getElementById('h8').style.display = 'block'
                        document.getElementById('box').style.display = 'none'
                    })
            }
            else {
                setLoginErr('Error: Please enter a valid email!')
            }
        }
        else {
            setLoginErr('Error: All fields are required!')
        }
    }

    return (
        <div id='loginContainter'>
            <div>
                <h1> Login </h1>
            </div>
            <div>
                <input type="email" placeholder="Email" className="loginInputs" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div>
                <input type="password" placeholder="Password" className="loginInputs" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <div id="loginWarning"> {loginError} </div>
            <div id="loginSuccess"> {loginSuccess} </div>
            <div>
                <button type="submit" id='loginBtn' onClick={handleLogin}>Login</button> <br />
               <Link to='/reset'> <button type="submit" id='resetBtn' style={{ marginTop: '1.2rem', backgroundColor: 'rgb(165,12,232,0.5)', width: '10rem', height: '2.5rem', fontSize: '1.2rem', borderRadius: '40px' }}> Reset? </button> </Link>
            </div>
            <h5 id='h8'>New user? Click <Link to='/signup'> here </Link> to Signup!</h5>
            <Box sx={{ width: '100%', marginTop: '20px', display: 'none' }} id='box'>
                <LinearProgress style={{ height: '2px' }} />
            </Box>
            <ToastContainer style={{ width: '240px' }} hideProgressBar />
        </div>
    )
}

export default React.memo(Login)
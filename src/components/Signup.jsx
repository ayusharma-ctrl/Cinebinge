import React, { useState } from 'react'
import '../styles/Signup.css'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../Firebase'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPass, setConfirmPass] = useState("")
    const [signupError, setSignupError] = useState("")
    const [signupSuccess, setSignupSuccess] = useState("")

    const navigate = useNavigate()
//function to handle signup feature, we are checking if everything is right or not
    const handleSignup = () => {
        let userCred;
        if (username !== '' && email !== '' && password !== '' && confirmPass !== '') {
            if (username.length >= 3) {
                var validator = require("email-validator");
                if (validator.validate(email)) {
                    if (password.length >= 5 && confirmPass.length >= 5) {
                        if (password === confirmPass) {
                            document.getElementById('signupBtn').style.display = 'none'
                            document.getElementById('h8').style.display = 'none'
                            document.getElementById('box').style.display = 'block'
                            //if everything is perfect then we are sending a request to firebase api to register/add this user
                            createUserWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    userCred = userCredential.user;
                                    return updateProfile(userCred, {
                                        displayName: username,
                                    });
                                })
                                .then(() => {
                                    // User profile updated successfully
                                    // console.log("User profile updated successfully");
                                    setSignupSuccess('Successfully Signed Up! Taking you to the Login Page...')
                                    setSignupError('')
                                    setUsername("")
                                    setEmail("")
                                    setPassword("")
                                    setConfirmPass("")
                                    setTimeout(() => {
                                        navigate('/login')
                                    }, 4000)
                                })
                                .catch((error) => {
                                    // in case user is already registered it will throw an error
                                    setSignupError(error.message.substring(10))
                                    setSignupSuccess('')
                                    document.getElementById('signupBtn').style.display = 'block'
                                    document.getElementById('h8').style.display = 'block'
                                    document.getElementById('box').style.display = 'none'
                                });
                        }
                        else {
                            setSignupError('Error: Passwords are not matching.')
                        }
                    }
                    else {
                        setSignupError('Error: Password should have atleast 5 characters.')
                    }
                }
                else {
                    setSignupError('Error: This email is not valid.')
                }
            }
            else {
                setSignupError('Error: Please enter a valid Username!')
            }
        }
        else {
            setSignupError('Error: All fields are required!')
        }

    };

    return (
        <div id='signupContainer'>
            <div>
                <h1> Signup </h1>
            </div>
            <div>
                <input type="text" placeholder='Username' className='signupInputs' value={username} onChange={(e) => { setUsername(e.target.value) }} />
            </div>
            <div>
                <input type="email" placeholder="Email" className="signupInputs" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div>
                <input type="password" placeholder="Password" className="signupInputs" value={password} onChange={(e) => { setPassword(e.target.value) }} />
            </div>
            <div>
                <input type="password" placeholder="Confirm Password" className="signupInputs" value={confirmPass} onChange={(e) => { setConfirmPass(e.target.value) }} />
            </div>
            <div id="signupWarning"> {signupError} </div>
            <div id="signupSuccess"> {signupSuccess} </div>
            <div>
                <button type="submit" id='signupBtn' onClick={handleSignup}>Submit</button>
            </div>
            <h5 id='h8'>Already have an account? Click <Link to='/login'> here </Link> to Login!</h5>
            <Box sx={{ width: '100%', marginTop: '20px', display: 'none' }} id='box'>
                <LinearProgress style={{ height: '2px' }} />
            </Box>
        </div>
    )
}

export default React.memo(Signup)
import React, {useState} from 'react'
import '../styles/Reset.css'
import { Link, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../Firebase'

//reseting user password and creating a new one
const Reset = () => {
    const [email, setEmail] = useState("")
    const [resetError, setResetErr] = useState("")
    const [resetSuccess, setResetSucc] = useState("")

    const navigate = useNavigate()

    const notifyReset = () => toast.success('Check your mailbox!', {
        position: "top-right",
        autoClose: 1600,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
    });

    const handleReset = () => {
        document.getElementById('resetBtn').style.display = 'none'
        document.getElementById('h8').style.display = 'none'
        document.getElementById('box').style.display = 'block'
        sendPasswordResetEmail(auth, email).then(() => {
            setResetSucc('Sending you a mail...')
            setResetErr('')
            notifyReset()
            setTimeout(() => {
                navigate('/login');
            }, 2100)
        }).catch((error) => {
            // console.log("Error: ===> " + error)
            setResetSucc('')
            setResetErr(error.message.substring(10))
            document.getElementById('resetBtn').style.display = 'block'
            document.getElementById('h8').style.display = 'block'
            document.getElementById('box').style.display = 'none'
        })
    }

    return (
        <div id='resetContainter'>
            <div>
                <h1> Reset Password </h1>
            </div>
            <div>
                <input type="email" placeholder="Email" className="resetInputs" value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div id="resetWarning"> {resetError} </div>
            <div id="resetSuccess"> {resetSuccess} </div>
            <div>
                <button type="submit" id='resetBtn' onClick={handleReset} > Reset? </button>
            </div>
            <h5 id='h8'> Click <Link to='/login'> here </Link> to Login!</h5>
            <Box sx={{ width: '100%', marginTop: '20px', display: 'none' }} id='box'>
                <LinearProgress style={{ height: '2px' }} />
            </Box>
            <ToastContainer style={{ width: '240px' }} hideProgressBar />
        </div>
    )
}

export default Reset
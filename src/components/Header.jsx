import React from 'react'
import '../styles/Header.css'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import NetflixIcon from '../netflix.png';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
// import { AuthContext } from '../AuthDetails'

const Header = () => {
  // const value = useContext(AuthContext)
  const object = JSON.parse(localStorage.getItem('object'))
  const navigate = useNavigate()

  const handleLogout = () => {
    signOut(auth).then(() => {
      // console.log('signout successful');
      localStorage.removeItem('object');
      navigate('/login')
    }).catch(error => console.log(error))
  }

  return (
    <div id='headerContainer'>
      <Link to='/' style={{ textDecoration: 'none' }}> <div id='brandName' style={{
        backgroundImage: `url(${NetflixIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: '1em center',
        cursor: 'pointer',
      }} > </div> </Link>
      <div id='headerContainer2'>
        {object === null ? (
          <>
            <div> <Link to='/login'> <button className='headerBtns'> Login </button> </Link> </div>
            <div> <Link to='/signup'> <button className='headerBtns'> SignUp </button> </Link> </div>
          </>
        ) : (
          <>
            <div><Link to='/login'> <button type="submit" className='headerBtns' onClick={handleLogout}>Logout</button> </Link></div>
            <div><Link to='/profile'> <button className='headerBtns'> <Chip avatar={<Avatar> {object.name.charAt(0)} </Avatar>} style={{ cursor: 'pointer', marginRight: '0', marginLeft:'4px'}} /> </button> </Link> </div>
          </>
        )}
      </div>
    </div>
  )
}

export default React.memo(Header)
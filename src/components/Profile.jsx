import React from 'react'
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import '../styles/Profile.css'

const Profile = () => {
  const object = JSON.parse(localStorage.getItem('object'))


  return (
    <div id='profileContainer'>
      <Chip avatar={<Avatar> {object.name.charAt(0)} </Avatar>} label={object.name} style={{ backgroundColor: 'violet' }} />
      <div style={{marginTop:'25px',lineHeight:'30px', marginBottom:'20px'}}>
        <p>Your Name:</p>
        <h3>{object.name}</h3>
        <p>Your Email:</p>
        <h3>{object.email}</h3>
      </div>
    </div>
  )
}

export default React.memo(Profile)
import React from 'react'
import '../App.css'

const Welcome = ({setIsFirstTimeUser}) => {
//using vibrate api to add vibrate functionality to give more personalized impact
    function vibrate(){
        if(navigator.vibrate){
            navigator.vibrate(1000)
        }else{
            console.log("Vibration API is not supported in your browser.");
        }
    }
//handles the welcome screen visibility
    function dismissWelcomeScreen() {
        setIsFirstTimeUser(false);
        vibrate()
      }

    return (
        <div style={{
            width: '100vw', height: '100vh', backgroundColor: 'black', color: 'black', display: 'flex',
            justifyContent: 'center', alignItems: 'center', flexDirection: 'column'
        }}>
            <div className='welcomeScreen' style={{margin: '10px 0'}}> <h3>Welcome back to</h3> </div>
            <div style={{margin: '10px 0'}}> <h2 style={{ color:'tomato'}}>NETFLIX</h2> </div>
            <button type="submit" onClick={dismissWelcomeScreen} style={{margin: '10px 0',width:'200px', height:'40px', 
            borderRadius:'30px',backgroundColor: 'limegreen', border:'none',color:'black',cursor:'pointer' }}>
                Start
            </button>
        </div>
    )
}

export default Welcome
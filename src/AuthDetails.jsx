import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState, createContext } from 'react'
import { auth } from './Firebase'
import App from './App'

const AuthContext = createContext(null);

const AuthDetails = () => {

    const [authUser, setAuthUser] = useState(null);

//checking user is authenticated or not, and updating the same in state and sharing this state with all the entire app components using contextApi
    useEffect(() => {
        const listen = onAuthStateChanged(auth,(user)=>{
            if(user){
                setAuthUser(user)
            }
            else{
                setAuthUser(null)
            }
        })

        return () => {
            listen();
        }

    }, [])

    return (
        <AuthContext.Provider value={authUser} >
            <App />
        </AuthContext.Provider>
    )
}

export default React.memo(AuthDetails)
export {AuthContext}
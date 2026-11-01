import React, { useContext, useEffect } from 'react'
import { UserDataContext } from '../context/userContext'
import { Navigate, useNavigate } from 'react-router-dom'




const UserProtectWrapper = ({ children }) => {
    // const { user } = useContext(UserDataContext) // Not using this, becuase it will be empty on page refresh
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    {/*if (!token) { // this is not working without useEffect(()
             navigate('/user/login')
    }*/}


    // Option 1 to redirect
    {/*useEffect(() => {
        if (!token) {
            navigate('/user/login')
        }
    }, [token, navigate])
    */}

    // Option 2 to redirect
    if (!token) {
        return <Navigate to="/user/login" replace />
    }

    
    return (
        <>
            {children}

        </>
    )
}

export default UserProtectWrapper
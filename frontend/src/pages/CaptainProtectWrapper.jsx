import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({ children }) => {
    // 👇 Use a distinct key so it doesn't conflict with regular users
    const token = localStorage.getItem('captainToken') 
    const { captain, setCaptain } = useContext(CaptainDataContext)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate('/captain/login')
            return
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            }
        }).catch(err => {
            console.log(err)
            localStorage.removeItem('captainToken') // Clear only the captain token
            navigate('/captain/login')
        })
    }, [token, navigate])

    if (isLoading) {
        return <div>Loading....</div>
    }

    return <>{children}</>
}

export default CaptainProtectWrapper
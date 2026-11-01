import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'

const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({}) // State to store user data

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext); //get context userdata

  const submitHandler = async (e) => {
    e.preventDefault()
    // Simulate API call - replace with actual API call

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);

    if(response.status === 201){
      const data = response.data;
      setUser(data.user) // set user data into context
       localStorage.setItem('token', data.token)
      navigate('/home');
    }


    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
  }
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img className="h-15 w-15 mx-auto mb-10" src="https://pngimg.com/uploads/uber/uber_PNG27.png" />
        <form onSubmit={submitHandler}>
          <h2 className='text-bold text-2xl mb-7 text-center'>Create an User Account</h2>
          <h3 className="text-base mb-2">What's your name?</h3>
          <div className="flex gap-4 mb-5">
            <input
              className="bg-[#eeeeee]  font-medium py-2 px-4 text-lg placeholder:text-base rounded-md w-1/2 border-gray-200"
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="bg-[#eeeeee]  font-medium py-2 px-4 text-lg placeholder:text-base rounded-md w-1/2 border-gray-200"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <h3 className="text-base mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-5 font-medium py-2 px-4 text-lg placeholder:text-base rounded-md w-full border-gray-200"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <h3 className="text-base mb-2">Password</h3>
          <input
            className="bg-[#eeeeee] mb-5 font-medium py-2 px-4 text-lg placeholder:text-base rounded-md w-full border-gray-200"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-[#111] text-white w-full py-2 px-4 rounded-md hover:bg-blue-600">
            Sign Up
          </button>
          <Link to="/user/login" className="block mt-4 text-left text-blue-800 hover:underline">
            Already have an account? Login
          </Link>
        </form>
      </div>
      <div className="mt-5">
        <p className='text-[12px] text-gray-900'>This site is protected by reCAPTCHA and the <span className="underline">Google Privacy</span>Policy and <span className="underline">Terms of Service</span> apply.</p>
      </div>
    </div>
  )
}

export default UserSignup
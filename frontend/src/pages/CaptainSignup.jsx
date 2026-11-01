import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'


const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const [userData, setUserData] = useState({}) // State to store user data

  const { captain, setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    // Simulate API call - replace with actual API call

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }
    //save data into database
    const reposnse = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData);

    if(reposnse.status === 201){
      const data = reposnse.data;
      setCaptain(data.captain) // set user data into context
      localStorage.setItem('captainToken', data.token)
      navigate('/captain/home');
    }
    //set fields empty after form submission    
    setEmail('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img className="h-15 w-15 mx-auto mb-10" src="https://pngimg.com/uploads/uber/uber_PNG27.png" />
        <form onSubmit={submitHandler}>
          <h2 className='text-bold text-2xl mb-7 text-center'>Create an Captain Account</h2>
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
            autoComplete="new-password" // 👈 Add this attribute
            required
          />
          <h3 className="px-2 text-base font-medium">Vehicle details</h3>
          <div className="flex flex-wrap mb-5 gap-4">
            <input
              className="bg-[#eeeeee] font-medium py-2 px-4 text-lg placeholder:text-base rounded-md flex-1 min-w-[45%] border-gray-200"
              type="text"
              placeholder="Vehicle color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
            />
            <input
              className="bg-[#eeeeee] font-medium py-2 px-4 text-lg placeholder:text-base rounded-md flex-1 min-w-[45%] border-gray-200"
              type="text"
              placeholder="Vehicle plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
            />
            <input
              className="bg-[#eeeeee] font-medium py-2 px-4 text-lg placeholder:text-base rounded-md flex-1 min-w-[45%] border-gray-200"
              type="number"
              min="1"
              placeholder="Vehicle capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
            />
            <select
              className="bg-[#eeeeee] font-medium py-2 px-4 text-xm placeholder:text-base rounded-md flex-1 min-w-[45%] border-gray-200"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
            >
              <option value="" disabled>Select vehicle type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="bike">Bike</option>
            </select>
          </div>

          <button type="submit" className="bg-[#111] text-white w-full py-2 px-4 rounded-md hover:bg-blue-600">
            Create Captain Account
          </button>
          <Link to="/captain/login" className="block mt-4 text-left text-blue-800 hover:underline">
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

export default CaptainSignup
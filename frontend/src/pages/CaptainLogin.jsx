import axios from 'axios'
import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
axios
const CaptainLogin = () => {
  const navigate = useNavigate();
  //Get the email and password from the form and send it to the backend to check if the user exists and if the password is correct. If the user exists and the password is correct, redirect to the home page. If not, show an error message.
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [captainData, setCaptainData] = React.useState({}) // State to store captain data
  const [error, setError] = React.useState('')
  const { captain, setCaptain } = useContext(CaptainDataContext);


  const submitHandler = async (e) => {
    e.preventDefault()
    // Simulate API call - replace with actual API call
    if (email && password) {
      // Successful login logic here
      console.log('Login successful')
     const captainData = {
        email: email,
        password: password
      }

       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData);
      
        if(response.status === 200){
          const data = response.data;
          setCaptain(data.user);
          localStorage.setItem('captainToken', data.token)
          console.log('Login successful')
          navigate('/captain/home');
        }
      setEmail('')
      setPassword('')
    } else {
      setError('Please fill in all fields')
    }
  }
  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img className="h-15 w-15 mx-auto mb-10" src="https://pngimg.com/uploads/uber/uber_PNG27.png" />
        <form onSubmit={submitHandler}>
          <h2 className='text-bold text-2xl mb-7 text-center'>Login as Captain</h2>
          <h3 className="text-xl mb-2">What's your email?</h3>
          <input
            className="bg-[#eeeeee] mb-4 font-medium py-2 px-4 text-lg placeholder:text-base rounded-md w-full border-gray-200"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-xl mb-2">Password</h3>
          <input
            className="bg-[#eeeeee] mb-4 font-medium py-2 px-4 text-lg placeholder:text-base rounded-md w-full border-gray-200"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="bg-[#111] text-white w-full py-2 px-4 rounded-md hover:bg-blue-600">
            Login as Captain
          </button>
          <Link to="/captain/signup" className="block mt-4 text-left text-blue-800 hover:underline">
            Don't have an account? Register
          </Link>
        </form>
      </div>
      <div className="mt-4 text-center">
        <Link to="/user/login" className="bg-[#f3171096] flex items-center justify-center text-white w-full py-2 px-4 rounded-md hover:bg-blue-600">Signin as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin
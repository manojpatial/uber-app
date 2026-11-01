import React from 'react'
import { Link } from 'react-router-dom'


const Start = () => {
  return (
    <div>
        <div className="bg-cover bg-[url('https://images.unsplash.com/photo-1593950315186-76a92975b60c?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D')] h-screen pt-8 w-full flex flex-col justify-between">
            <img className="h-15 w-15 mx-auto"  src="https://pngimg.com/uploads/uber/uber_PNG27.png" />
            <div className="bg-white px-4 py-4 pb-7">
                <h1 className="text-2xl font-bold text-center">Get Started with Uber</h1>
                <Link to="/user/login" className="flex items-center justify-center bg-black text-white py-3 mt-2 rounded-md hover:bg-gray-800">Continue</Link>
            </div>
        </div>
    </div>
  )
}

export default Start
import React, { use } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'
import { MentorContext } from '../context/MentorContext.jsx'

const Navbar = () => {

  const { aToken, setAToken } = useContext(AdminContext)
  const { mToken, setMToken } = useContext(MentorContext)

  const navigate = useNavigate()

  const logout = () => {
    if (aToken) {
      navigate('/')
      aToken && setAToken('')
      aToken && localStorage.removeItem('aToken')
    } else {
      navigate('/')
      mToken && setMToken('')
      mToken && localStorage.removeItem('MToken')
    }
  }


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b-2 border-gray-300 bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-44 h-22 cursor-pointer' src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full'>{aToken ? 'Admin' : 'Mentor'}</p>
      </div>
      <button onClick={logout} className='bg-[#5F6FFF] text-white test-sm px-10 py-2 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar

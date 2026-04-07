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
    <div className='glass-nav flex items-center justify-between px-6 sm:px-12 py-5 sticky top-0 z-50'>
      <div className='flex items-center gap-4 text-xs font-semibold'>
        <img className='w-44 h-auto cursor-pointer hover:opacity-90 transition-opacity' src={assets.admin_logo} alt="" />
        <p className='border border-indigo-500/50 text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider'>{aToken ? 'Admin' : 'Mentor'}</p>
      </div>
      <button onClick={logout} className='bg-indigo-600 hover:bg-indigo-500 text-white font-bold tracking-wider px-10 py-2.5 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:-translate-y-1 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar

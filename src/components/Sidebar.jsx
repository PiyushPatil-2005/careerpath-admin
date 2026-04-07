import React from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext.jsx'
import { NavLink } from 'react-router-dom'
import { MentorContext } from '../context/MentorContext.jsx'

const Sidebar = () => {

    const { aToken } = useContext(AdminContext)
    const { mToken } = useContext(MentorContext)

  return (
    <div className='w-[280px] shrink-0 h-[calc(100vh-120px)] glass-card ml-6 mt-8 rounded-[2rem] sticky top-[100px] flex flex-col p-4 shadow-xl shadow-black/40 overflow-hidden hide-scrollbar'>
        {
            aToken && <ul className='flex flex-col gap-2 text-slate-400 mt-2'>

                <NavLink className={({isActive})=> `flex items-center gap-4 py-3.5 px-5 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] text-white' : 'hover:bg-white/5 hover:text-white'}`} to={'/admin-dashboard'}>
                    <img className='w-6 invert opacity-80 group-hover:opacity-100' src={assets.home_icon} alt="" />
                    <p className='hidden md:block font-semibold tracking-wide'>Dashboard</p>
                </NavLink>
                
                <NavLink className={({isActive})=> `flex items-center gap-4 py-3.5 px-5 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] text-white' : 'hover:bg-white/5 hover:text-white'}`} to={'/all-appointments'}>
                    <img className='w-6 invert opacity-80 group-hover:opacity-100' src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block font-semibold tracking-wide'>Appointments</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-4 py-3.5 px-5 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] text-white' : 'hover:bg-white/5 hover:text-white'}`} to={'/add-mentor'}>
                    <img className='w-6 invert opacity-80 group-hover:opacity-100' src={assets.add_icon} alt="" />
                    <p className='hidden md:block font-semibold tracking-wide'>Add Mentor</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-4 py-3.5 px-5 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] text-white' : 'hover:bg-white/5 hover:text-white'}`} to={'/mentor-list'}>
                    <img className='w-6 invert opacity-80 group-hover:opacity-100' src={assets.people_icon} alt="" />
                    <p className='hidden md:block font-semibold tracking-wide'>Mentors List</p>
                </NavLink>

            </ul>
        }

        {
            mToken && <ul className='flex flex-col gap-2 text-slate-400 mt-2'>

                <NavLink className={({isActive})=> `flex items-center gap-4 py-3.5 px-5 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] text-white' : 'hover:bg-white/5 hover:text-white'}`} to={'/mentor-dashboard'}>
                    <img className='w-6 invert opacity-80 group-hover:opacity-100' src={assets.home_icon} alt="" />
                    <p className='hidden md:block font-semibold tracking-wide'>Dashboard</p>
                </NavLink>
                
                <NavLink className={({isActive})=> `flex items-center gap-4 py-3.5 px-5 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] text-white' : 'hover:bg-white/5 hover:text-white'}`} to={'/mentor-appointments'}>
                    <img className='w-6 invert opacity-80 group-hover:opacity-100' src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block font-semibold tracking-wide'>Appointments</p>
                </NavLink>

                <NavLink className={({isActive})=> `flex items-center gap-4 py-3.5 px-5 rounded-xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.4)] text-white' : 'hover:bg-white/5 hover:text-white'}`} to={'/mentor-profile'}>
                    <img className='w-6 invert opacity-80 group-hover:opacity-100' src={assets.people_icon} alt="" />
                    <p className='hidden md:block font-semibold tracking-wide'>Profile</p>
                </NavLink>

            </ul>
        }
    </div>
  )
}

export default Sidebar
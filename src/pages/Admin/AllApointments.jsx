import React, { useEffect, useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const AllApointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5 animate-fade-up'>

      <p className='mb-6 text-2xl font-bold text-white glow-text tracking-wide'>All Appointments</p>

      <div className='glass-card rounded-2xl text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll hide-scrollbar'>

        {/* Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-4 px-6 border-b border-white/10 font-bold text-slate-300 bg-slate-900/50 uppercase tracking-wider text-xs'>
          <p>#</p>
          <p>User</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Mentor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Rows */}
        {appointments.map((item, index) => (
          <div
            key={index}
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-slate-400 py-4 px-6 border-b border-white/5 hover:bg-white/5 transition-colors'
          >
            <p className='max-sm:hidden text-slate-500'>{index + 1}</p>

            <div className='flex items-center gap-3'>
              <img className='w-10 h-10 rounded-full object-cover border border-white/10 mix-blend-lighten bg-white/10' src={item.userData.image} alt="" />
              <p className='font-semibold text-slate-200'>{item.userData.name}</p>
            </div>

            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>

            <p className='text-indigo-400'>{slotDateFormat(item.slotDate)} <span className='text-slate-500'>|</span> <span className='text-slate-300'>{item.slotTime}</span></p>

            <div className='flex items-center gap-3'>
              <img className='w-10 h-10 rounded-full object-cover border border-white/10 mix-blend-lighten bg-white/10' src={item.menData.image} alt="" />
              <p className='font-semibold text-slate-200'>{item.menData.name}</p>
            </div>

            <p className='font-medium text-emerald-400'>{currency} {item.amount}</p>

            {
              item.cancelled
                ? <p className='text-red-400 text-xs font-bold uppercase tracking-wider bg-red-400/10 px-3 py-1 rounded-full w-max'>Cancelled</p>
                : item.isCompleted
                  ? <p className='text-green-400 text-xs font-bold uppercase tracking-wider bg-green-400/10 px-3 py-1 rounded-full w-max'>Completed</p>
                  : <img
                      onClick={() => cancelAppointment(item._id)}
                      className='w-8 p-1.5 rounded-full cursor-pointer bg-red-500/10 hover:bg-red-500/30 transition-colors opacity-80 hover:opacity-100'
                      src={assets.cancel_icon}
                      alt=""
                    />
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllApointments
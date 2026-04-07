import React from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { MentorContext } from '../../context/MentorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const MentorAppointments = () => {

  const { mToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(MentorContext)

  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)

  useEffect(() => {
    if(mToken) {
      getAppointments()
    }
  }, [mToken])

  return (
    <div className='w-full max-w-6xl m-5 animate-fade-up'>

      <p className='mb-6 text-2xl font-bold text-white glow-text tracking-wide'>All Appointments</p>

      <div className='glass-card rounded-2xl text-sm max-h-[80vh] overflow-y-scroll hide-scrollbar'>

        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-4 px-6 border-b border-white/10 font-bold text-slate-300 bg-slate-900/50 uppercase tracking-wider text-xs'>
          <p>#</p>
          <p>User</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {
          appointments.reverse().map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-slate-400 py-4 px-6 border-b border-white/5 hover:bg-white/5 transition-colors' key={index}>
              <p className='max-sm:hidden text-slate-500'>{index+1}</p>
              <div className='flex items-center gap-3'>
                <img className='w-10 h-10 object-cover rotate-0 mix-blend-lighten bg-white/10 rounded-full' src={item.userData.image} alt="" /> 
                <p className='font-semibold text-slate-200'>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-[10px] font-bold tracking-wider inline border border-indigo-500/50 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full uppercase'>
                  { item.payment ? 'Online' : 'CASH' }
                </p>
              </div>
              <p className='max-sm:hidden'>{ calculateAge(item.userData.dob)}</p>
              <p className='text-indigo-400'>{ slotDateFormat(item.slotDate) } <span className='text-slate-500'>|</span> <span className='text-slate-300'>{ item.slotTime }</span></p>
              <p className='font-medium text-emerald-400'>{ currency }{item.amount}</p>
              {
                item.cancelled
                  ? <p className='text-red-400 text-xs font-bold uppercase tracking-wider bg-red-400/10 px-3 py-1 rounded-full w-max'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-400 text-xs font-bold uppercase tracking-wider bg-green-400/10 px-3 py-1 rounded-full w-max'>Completed</p>
                    : <div className='flex gap-2'>
                        <img onClick={() => cancelAppointment(item._id)} className='w-8 p-1.5 rounded-full cursor-pointer bg-red-500/10 hover:bg-red-500/30 transition-colors opacity-80 hover:opacity-100' src={assets.cancel_icon} alt="" />
                        <img onClick={() => completeAppointment(item._id)} className='w-8 p-1.5 rounded-full cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/30 transition-colors opacity-80 hover:opacity-100' src={assets.tick_icon} alt="" />
                      </div>
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MentorAppointments

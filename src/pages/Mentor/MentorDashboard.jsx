import React from 'react'
import { useEffect, useContext } from 'react'
import { MentorContext } from '../../context/MentorContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'


const MentorDashboard = () => {

  const { mToken, dashData, setDashData, getDashData, completeAppointment, cancelAppointment } = useContext(MentorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (mToken) {
      getDashData()
    }
  }, [mToken])

  return dashData && (
    <div className='m-5 animate-fade-up w-full'>

      <div className='flex flex-wrap gap-4'>

        <div className='flex items-center gap-5 glass-card p-6 min-w-64 rounded-2xl cursor-pointer group flex-1'>
          <div className='w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30 group-hover:bg-indigo-500/40 transition-colors'>
             <img className='w-8 invert opacity-80' src={assets.earning_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-emerald-400'>{currency} {dashData.earnings}</p>
            <p className='text-slate-400 font-medium tracking-wide text-sm uppercase mt-1'>Earnings</p>
          </div>
        </div>

        <div className='flex items-center gap-5 glass-card p-6 min-w-64 rounded-2xl cursor-pointer group flex-1'>
          <div className='w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30 group-hover:bg-indigo-500/40 transition-colors'>
             <img className='w-8 invert opacity-80' src={assets.appointments_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-white'>{dashData.appointments}</p>
            <p className='text-slate-400 font-medium tracking-wide text-sm uppercase mt-1'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-5 glass-card p-6 min-w-64 rounded-2xl cursor-pointer group flex-1'>
          <div className='w-14 h-14 bg-indigo-500/20 rounded-full flex items-center justify-center border border-indigo-500/30 group-hover:bg-indigo-500/40 transition-colors'>
             <img className='w-8 invert opacity-80' src={assets.patients_icon} alt="" />
          </div>
          <div>
            <p className='text-3xl font-bold text-white'>{dashData.users}</p>
            <p className='text-slate-400 font-medium tracking-wide text-sm uppercase mt-1'>Users</p>
          </div>
        </div>

      </div>

      <div className='glass-card mt-8 rounded-2xl overflow-hidden'>
        <div className='flex items-center gap-3 px-6 py-5 border-b border-white/5 bg-slate-900/50'>
          <img className='invert opacity-70 w-5' src={assets.list_icon} alt="" />
          <p className='font-semibold text-lg text-white tracking-wide'>Latest Bookings</p>
        </div>

        <div className='pt-2 pb-4'>
          {
            dashData.latestAppointments.map((item, index) => (
              <div className='flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0' key={index}>
                <div className='flex items-center gap-4'>
                  <img className='rounded-full w-12 h-12 object-cover border border-white/10 mix-blend-lighten bg-white/10' src={item.userData.image} alt="" />
                  <div className='text-sm'>
                    <p className='text-slate-100 font-semibold text-base'>{item.userData.name}</p>
                    <p className='text-indigo-400 mt-0.5'>{slotDateFormat(item.slotDate)}</p>
                  </div>
                </div>
                {
                  item.cancelled
                    ? <p className='text-red-400 text-xs font-bold uppercase tracking-wider bg-red-400/10 px-3 py-1 rounded-full'>Cancelled</p>
                    : item.isCompleted
                      ? <p className='text-green-400 text-xs font-bold uppercase tracking-wider bg-green-400/10 px-3 py-1 rounded-full'>Completed</p>
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

    </div>
  )
}

export default MentorDashboard

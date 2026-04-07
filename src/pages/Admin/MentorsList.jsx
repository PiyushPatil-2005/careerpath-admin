import React from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useContext, useEffect } from 'react'

const MentorsList = () => {

  const { mentors, aToken, getAllMentors, changeAvailability } = useContext(AdminContext)

  useEffect(() => {
    if(aToken)  {
      getAllMentors()
    }
  }, [aToken])
  
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll w-full pr-4 animate-fade-up hide-scrollbar'>
      <h1 className='text-2xl font-bold text-white mb-6 glow-text tracking-wide'>All Mentors</h1>
      <div className='w-full flex flex-wrap gap-5'>
        {
          mentors.map((item, index)=> (
            <div className='glass-card rounded-2xl overflow-hidden cursor-pointer group w-60' key={index}>
              <div className='w-full h-60 bg-white/10 relative overflow-hidden'>
                <img className="w-full h-full object-cover mix-blend-normal opacity-90 group-hover:scale-105 transition-transform duration-500" src={item.image} alt="" />
              </div>
              <div className='p-6'>
                <p className='text-slate-100 text-lg font-bold truncate group-hover:text-indigo-400 transition-colors'>{item.name}</p>
                <p className='text-slate-400 text-sm font-medium mt-1 uppercase tracking-wide'>{item.speciality}</p>
                <div className='mt-4 flex items-center justify-between gap-1 text-sm'>
                  <div className='flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700/50 w-full'>
                    <input className='w-4 h-4 accent-indigo-500 cursor-pointer' onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                    <p className={item.available ? 'text-green-400 font-semibold' : 'text-slate-500 font-semibold'}>{item.available ? 'Available' : 'Unavailable'}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MentorsList

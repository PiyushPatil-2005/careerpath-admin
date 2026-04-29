import React, { useContext, useEffect, useState } from 'react'
import { MentorContext } from '../../context/MentorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MentorProfile = () => {

  const { mToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(MentorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const [announcements, setAnnouncements] = useState([])
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false)


  const updateProfile = async () => {

    try {
      if (!profileData.about || profileData.about.trim().length < 10) {
        return toast.error("About section must be at least 10 characters long")
      }
      for (const s of profileData.sessions) {
        if (s.fee < 0) return toast.error("Session fees cannot be negative")
      }

      const updateData = {
        about: profileData.about,
        sessions: profileData.sessions,
        available: profileData.available
      }

      const { data } = await axios.post(
        backendUrl + '/api/mentor/update-profile',
        updateData,
        { headers: { mToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  const updateSessionFee = (index, value) => {
    const updatedSessions = [...profileData.sessions]
    updatedSessions[index].fee = Number(value)

    setProfileData(prev => ({
      ...prev,
      sessions: updatedSessions
    }))
  }

  const createAnnouncement = async () => {
    try {
      if (!title || title.trim().length < 3) {
        return toast.error("Announcement title must be at least 3 characters long")
      }
      if (!message || message.trim().length < 5) {
        return toast.error("Announcement message must be at least 5 characters long")
      }

      const { data } = await axios.post(
        backendUrl + '/api/mentor/create-announcement',
        { title, message },
        { headers: { mToken } }
      )

      if (data.success) {
        toast.success("Announcement Created")
        setTitle("")
        setMessage("")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const getMyAnnouncements = async () => {

    try {

      const { data } = await axios.get(
        backendUrl + '/api/mentor/my-announcements',
        { headers: { mToken } }
      )

      if (data.success) {
        setAnnouncements(data.announcements)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const deleteAnnouncement = async (announcementId) => {

    try {

      const { data } = await axios.post(
        backendUrl + '/api/mentor/delete-announcement',
        { announcementId },
        { headers: { mToken } }
      )

      if (data.success) {
        toast.success(data.message)
        getMyAnnouncements()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {

    if (mToken) {
      getProfileData()
      getMyAnnouncements()
    }

  }, [mToken])

  return profileData && (

    <div className='w-full'>

      <div className='flex flex-col gap-6 m-5 animate-fade-up max-w-4xl'>

        <div className='relative w-full h-[25vh] sm:h-[35vh] rounded-3xl overflow-hidden glass-card flex items-end'>
          <div className='absolute inset-0 bg-gradient-to-t from-indigo-950 via-slate-900/50 to-transparent z-0'/>
          <div className='relative z-10 p-8 flex items-end gap-6 w-full'>
             <img className='w-32 h-32 md:w-40 md:h-40 rounded-2xl border-[3px] border-indigo-500 object-cover mix-blend-normal bg-white/10 shadow-2xl' src={profileData.image} alt="" />
             <div className='flex-1 pb-2'>
               <p className='text-3xl md:text-5xl font-bold text-white tracking-wide glow-text mb-2'>
                 {profileData.name}
               </p>
               <p className='text-lg md:text-xl text-indigo-300 font-semibold uppercase tracking-wider'>
                 {profileData.degree} <span className='text-white/30 px-2'>•</span> <span className='text-indigo-400'>{profileData.speciality}</span>
               </p>
             </div>
          </div>
        </div>

        <div className='glass-card rounded-3xl p-8 sm:p-10 pb-12 w-full'>

          {/* ABOUT */}
          <div>
            <p className='flex items-center gap-2 font-bold text-lg text-white mb-4 uppercase tracking-widest'>
              <span className='w-8 h-[2px] bg-indigo-500 inline-block rounded-full' /> About
            </p>

            {isEdit ? (
              <textarea
                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white placeholder-slate-500 transition-all outline-none"
                rows={4}
                value={profileData.about}
                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
              />
            ) : (
              <p className='text-slate-400 max-w-3xl leading-relaxed'>
                {profileData.about}
              </p>
            )}

          </div>

          <hr className='my-8 border-white/5' />

          {/* SESSION FEES */}
          <div className='mt-4'>
            <p className='flex items-center gap-2 font-bold text-lg text-white mb-6 uppercase tracking-widest'>
              <span className='w-8 h-[2px] bg-indigo-500 inline-block rounded-full' /> Session Fees
            </p>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl'>
            {profileData.sessions?.map((session, index) => (

              <div key={index} className='flex items-center justify-between gap-3 bg-slate-900/50 border border-white/5 px-6 py-4 rounded-xl'>

                <span className='text-slate-300 font-semibold tracking-wide'>
                  {session.name}
                </span>

                {isEdit ? (

                  <input
                    type="number"
                    className="w-24 px-3 py-1.5 bg-slate-800 border border-slate-600 focus:border-indigo-500 rounded text-center text-white outline-none"
                    value={session.fee}
                    onChange={(e) => updateSessionFee(index, e.target.value)}
                  />

                ) : (

                  <span className='text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-full'>
                    {currency} {session.fee}
                  </span>

                )}

              </div>

            ))}
            </div>
          </div>

          <hr className='my-8 border-white/5' />

          {/* AVAILABILITY */}
          <div className='flex gap-3 pt-2 items-center'>
            {isEdit ? (
              <div className='bg-slate-900/50 border border-slate-700/50 px-6 py-3 rounded-xl flex items-center gap-3'>
                <input
                  className='w-5 h-5 accent-indigo-500 cursor-pointer'
                  type="checkbox"
                  checked={profileData.available}
                  onChange={() => setProfileData(prev => ({ ...prev, available: !prev.available }))}
                />
                <label className='font-semibold text-slate-300 cursor-pointer'>Accepting New Appointments</label>
              </div>
            ) : (
              <div className={`border px-6 py-3 rounded-xl flex items-center gap-2 font-bold uppercase tracking-wider text-xs ${profileData.available ? 'border-green-500/30 bg-green-500/10 text-green-400' : 'border-slate-700 bg-slate-800 text-slate-500'}`}>
                <span className={`w-2 h-2 rounded-full ${profileData.available ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
                {profileData.available ? 'Available' : 'Unavailable'}
              </div>
            )}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-10">

            {
              isEdit
                ? <button
                  onClick={updateProfile}
                  className='px-8 py-3 bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] font-bold tracking-wide rounded-full text-white transition-all cursor-pointer'>
                  Save Changes
                </button>

                : <button
                  onClick={() => setIsEdit(true)}
                  className='px-10 py-3 border-[2px] border-indigo-500 text-indigo-400 font-bold tracking-wide rounded-full hover:bg-indigo-500/20 hover:text-white transition-all cursor-pointer'>
                  Edit Profile
                </button>
            }

            <button
              onClick={() => setShowAnnouncementForm(prev => !prev)}
              className='px-10 py-3 border-[2px] border-green-500/30 text-green-400 rounded-full hover:bg-green-500/10 font-bold tracking-wide transition-all cursor-pointer'
            >
              {showAnnouncementForm ? "Close Announcement" : "Create Announcement"}
            </button>

          </div>

          {/* ANNOUNCEMENT FORM */}
          {showAnnouncementForm && (
            <div className="mt-8 bg-slate-900/50 p-6 rounded-2xl border border-white/10 animate-fade-up">
              <p className="font-bold text-lg text-white mb-4 uppercase tracking-widest">
                Create Announcement
              </p>
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Announcement Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700/50 focus:border-indigo-500 rounded-xl text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-indigo-500"
                  minLength="3"
                  maxLength="100"
                />
                <textarea
                  placeholder="Announcement Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700/50 focus:border-indigo-500 rounded-xl text-white placeholder-slate-500 outline-none focus:ring-1 focus:ring-indigo-500"
                  minLength="5"
                  maxLength="500"
                />
                <button
                  onClick={createAnnouncement}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 font-bold rounded-full text-white w-max transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)]"
                >
                  Post Announcement
                </button>
              </div>
            </div>
          )}

          {/* ANNOUNCEMENTS LIST */}
          {announcements.length > 0 && (
            <div className="mt-12 pt-8 border-t border-white/5">

              <h2 className="flex items-center gap-2 font-bold text-lg text-white mb-6 uppercase tracking-widest">
                <span className='w-8 h-[2px] bg-indigo-500 inline-block rounded-full' /> Your Announcements
              </h2>

              <div className="flex flex-col gap-4">
                {announcements.map((item) => (
                  <div key={item._id} className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl flex justify-between items-start hover:border-white/10 transition-colors">
                    <div>
                      <p className="font-bold text-lg text-white mb-1">{item.title}</p>
                      <p className="text-slate-400 leading-relaxed max-w-2xl">{item.message}</p>
                    </div>
                    <button
                      onClick={() => deleteAnnouncement(item._id)}
                      className="text-red-400 font-bold text-xs uppercase tracking-widest border border-red-500/50 bg-red-500/10 px-4 py-2 rounded-full hover:bg-red-500 hover:text-white transition-colors ml-4 shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>
      </div>

    </div>
  )
}

export default MentorProfile
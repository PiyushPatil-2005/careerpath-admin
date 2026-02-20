import React, { useContext, useEffect, useState } from 'react'
import { MentorContext } from '../../context/MentorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MentorProfile = () => {

  const { mToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(MentorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {

    try {
      
      const updateData = {
        about: profileData.about,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/mentor/update-profile', updateData, {headers: {mToken}})

      if(data.success) {
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
  
  useEffect(() => {
    if (mToken) {
      getProfileData()
    }
  }, [mToken])
  
  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full h-58 sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/* Mentor Info : name, degree, experience */}

          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p className='text-xl'>{profileData.degree} - {profileData.speciality}</p>
          </div>

          {/* Mentor About */}
          <div>
            <p className='flex items-center gap-1 font-medium text-neutral-800 mt-3'>About:</p>
            {isEdit ? (
              <textarea
                className="border p-2 w-full rounded-md mt-2"
                rows={3}
                value={profileData.about}
                onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))}
              />
            ) : (
              <p className='text-gray-600 max-w-[700px] mt-2'>{profileData.about}</p>
            )}
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>
              {isEdit ? (
                <input
                  type="number"
                  className="border p-1 rounded-md w-24"
                  value={profileData.fees}
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                />
              ) : (
                `${currency} ${profileData.fees}`
              )}
            </span>
          </p>

          <div className='flex text-gray-600 font-medium gap-2'>
            <p>College Name: {profileData.collegeName}</p>
          </div>

          <div className='flex text-gray-600 font-medium gap-2'>
            <p> College Duration <span> : </span>
              {profileData.collegeStartYear}
              <span> - To - </span>
              {profileData.collegeEndYear}
            </p>
          </div>

          {/* Availability checkbox - now editable in Edit mode */}
          <div className='flex gap-2 pt-2 items-center'>
            {isEdit ? (
              <>
                <input
                  type="checkbox"
                  checked={profileData.available}
                  onChange={() => setProfileData(prev => ({ ...prev, available: !prev.available }))}
                />
                <label>Available</label>
              </>
            ) : (
              <>
                <input type="checkbox" checked={profileData.available} readOnly />
                <label>Available</label>
              </>
            )}
          </div>

          {
            isEdit
            ? <button onClick={updateProfile} className='px-6 py-2 border border-[#5f6FFF] rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-all cursor-pointer'>Save</button>
            : <button onClick={()=> setIsEdit(true)} className='px-6 py-2 border border-[#5f6FFF] rounded-full mt-5 hover:bg-[#5f6FFF] hover:text-white transition-all cursor-pointer'>Edit</button>
          }

        </div>
      </div>
    </div>
  )
}

export default MentorProfile

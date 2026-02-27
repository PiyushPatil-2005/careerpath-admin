import React, { useContext, useEffect, useState } from 'react'
import { MentorContext } from '../../context/MentorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const MentorProfile = () => {

  const { mToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(MentorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);


  const updateProfile = async () => {

    try {

      const updateData = {
        about: profileData.about,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/mentor/update-profile', updateData, { headers: { mToken } })

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

  const createAnnouncement = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/mentor/create-announcement',
        { title, message },
        { headers: { mToken } }
      );

      if (data.success) {
        toast.success("Announcement Created");
        setTitle("");
        setMessage("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  const getMyAnnouncements = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + '/api/mentor/my-announcements',
        { headers: { mToken } }
      );

      if (data.success) {
        setAnnouncements(data.announcements);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteAnnouncement = async (announcementId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/mentor/delete-announcement',
        { announcementId },
        { headers: { mToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getMyAnnouncements(); // refresh list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (mToken) {
      getProfileData()
      getMyAnnouncements()
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

          <div className="flex gap-3 mt-5">
            {
              isEdit
                ? <button
                  onClick={updateProfile}
                  className='px-6 py-2 border border-[#5f6FFF] rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all cursor-pointer'>
                  Save
                </button>
                : <button
                  onClick={() => setIsEdit(true)}
                  className='px-6 py-2 border border-[#5f6FFF] rounded-full hover:bg-[#5f6FFF] hover:text-white transition-all cursor-pointer'>
                  Edit
                </button>
            }

            {/* NEW BUTTON */}
            <button
              onClick={() => setShowAnnouncementForm(prev => !prev)}
              className='px-6 py-2 border border-green-500 text-green-600 rounded-full hover:bg-green-500 hover:text-white transition-all cursor-pointer'
            >
              {showAnnouncementForm ? "Close Announcement" : "Create Announcement"}
            </button>
          </div>
          {/* ================= Mentor Announcements List ================= */}
          {announcements.length > 0 && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Your Announcements
              </h2>

              <div className="flex flex-col gap-3">
                {announcements.map((item) => (
                  <div
                    key={item._id}
                    className="border p-4 rounded-lg flex justify-between items-start"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.message}</p>
                    </div>

                    <button
                      onClick={() => deleteAnnouncement(item._id)}
                      className="text-red-500 border border-red-400 px-3 py-1 rounded-full hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Announcement Section */}
          {showAnnouncementForm && (
            <div className="mt-8 border-t pt-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Create Announcement
              </h2>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Announcement Title (e.g. 20% Off on Sunday)"
                  className="border p-2 rounded-md"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                  placeholder="Write announcement message..."
                  className="border p-2 rounded-md"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />

                <button
                  onClick={createAnnouncement}
                  className="bg-[#5F6FFF] text-white px-6 py-2 rounded-full w-fit"
                >
                  Post Announcement
                </button>
              </div>
            </div>
          )}

          
        </div>
      </div>
    </div>
  )
}

export default MentorProfile

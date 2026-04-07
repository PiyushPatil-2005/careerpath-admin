import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddMentor = () => {

  const [menImg, setMenImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')
  const [dob, setDob] = useState('')
  const [phone, setPhone] = useState('')
  const [speciality, setSpeciality] = useState('Engineering')
  const [college, setCollege] = useState('')
  const [degree, setDegree] = useState('')
  const [collegeStartYear, setCollegeStartYear] = useState('')
  const [collegeEndYear, setCollegeEndYear] = useState('')
  const [sessions, setSessions] = useState([
    { name: "", fee: "" }
  ])
  const [about, setAbout] = useState('')

  const { backendUrl, aToken } = useContext(AdminContext)

  const addSession = () => {
    setSessions([...sessions, { name: "", fee: "" }])
  }

  const updateSession = (index, field, value) => {
    const updated = [...sessions]
    updated[index][field] = value
    setSessions(updated)
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {

      if (!menImg) {
        return toast.error('Image Not Selected')
      }

      const formData = new FormData()

      formData.append('image', menImg)
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('gender', gender)
      formData.append('dob', dob)
      formData.append('phone', phone)
      formData.append('speciality', speciality)
      formData.append('collegeName', college)
      formData.append('degree', degree)
      formData.append('collegeStartYear', collegeStartYear)
      formData.append('collegeEndYear', collegeEndYear)
      // formData.append('fees', fees)
      formData.append("sessions", JSON.stringify(sessions))
      formData.append('about', about)

      // console.log(...formData);

      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`)
      })

      const { data } = await axios.post(backendUrl + '/api/admin/add-mentor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setMenImg(false)
        setName('')
        setEmail('')
        setPassword('')
        setGender('')
        setDob('')
        setPhone('')
        setSpeciality('Engineering')
        setCollege('')
        setDegree('')
        setCollegeStartYear('')
        setCollegeEndYear('')
        setSessions([{ name: "", fee: "" }])
        setAbout('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.error(error)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} action="" className='m-5 w-full animate-fade-up'>

      <p className='mb-6 text-2xl font-bold text-white glow-text tracking-wide'>Add Mentor</p>

      <div className='glass-card px-8 py-8 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-y-scroll hide-scrollbar'>
        <div className='flex items-center gap-4 mb-8 text-slate-300'>
          <label htmlFor="men-img">
            <img className='w-24 h-24 object-cover bg-slate-900/50 rounded-full cursor-pointer border-2 border-indigo-500/30 hover:border-indigo-400 transition-colors' src={menImg ? URL.createObjectURL(menImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setMenImg(e.target.files[0])} type="file" id='men-img' hidden />
          <p className='font-medium text-sm tracking-wide'>Upload Mentor <br /> Picture </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-8 text-slate-300'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Mentor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Mentor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none' type="email" placeholder='Email' required />
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Mentor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none' type="password" placeholder='Password' required />
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Mentor Gender</p>
              <select onChange={(e) => setGender(e.target.value)} value={gender} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white outline-none cursor-pointer' required>
                <option value="Not Selected" className='bg-slate-900'>Select Gender</option>
                <option value="Male" className='bg-slate-900'>Male</option>
                <option value="Female" className='bg-slate-900'>Female</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Date Of Birth</p>
              <input onChange={(e) => setDob(e.target.value)} value={dob} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none [color-scheme:dark]' type="date" placeholder='DOB' required />
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Phone Number</p>
              <input onChange={(e) => setPhone(e.target.value)} value={phone} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none' type="number" placeholder='Phone number' required />
            </div>

          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white outline-none cursor-pointer' required >
                <option value="Engineering" className='bg-slate-900'>Engineering</option>
                <option value="Medical" className='bg-slate-900'>Medical</option>
                <option value="Management" className='bg-slate-900'>Management</option>
                <option value="Design" className='bg-slate-900'>Design</option>
                <option value="Law" className='bg-slate-900'>Law</option>
                <option value="Arts" className='bg-slate-900'>Arts</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Mentor College Name</p>
              <input onChange={(e) => setCollege(e.target.value)} value={college} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none' type="text" placeholder='College Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Mentor Degree</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none' type="text" placeholder='Degree' required />
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <label className='text-sm font-semibold'>College Duration:</label>
              <div className='flex gap-3'>
                {/* Start Year */}
                <input onChange={(e) => setCollegeStartYear(e.target.value)} value={collegeStartYear} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none w-full' type="number" name="collegeStartYear" placeholder="Start Year" min="2000" max="2024" pattern="20[0-9]{2}" required />
                {/* End Year */}
                <input onChange={(e) => setCollegeEndYear(e.target.value)} value={collegeEndYear} className='bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none w-full' type="number" name="collegeEndYear" placeholder="End Year" min="2001" max="2033" pattern="20[0-9]{2}" required />
              </div>
            </div>

            <div className='flex-1 flex flex-col gap-1.5'>
              <p className='text-sm font-semibold'>Sessions</p>

              {sessions.map((session, index) => (
                <div key={index} className="flex gap-3 mb-2">

                  <input
                    type="text"
                    placeholder="Session Name"
                    value={session.name}
                    onChange={(e) =>
                      updateSession(index, "name", e.target.value)
                    }
                    className="bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none w-full"
                  />

                  <input
                    type="number"
                    placeholder="Fee"
                    value={session.fee}
                    onChange={(e) =>
                      updateSession(index, "fee", e.target.value)
                    }
                    className="bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 transition-all outline-none w-32 shrink-0"
                  />

                </div>
              ))}

              <button
                type="button"
                onClick={addSession}
                className="text-indigo-400 font-semibold w-max hover:text-indigo-300 transition-colors mt-1"
              >
                + Add Session
              </button>
            </div>

          </div>
        </div>

        <div>
          <p className='mt-6 mb-2 text-sm font-semibold text-slate-300'>About Mentor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 py-3 bg-slate-900/50 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-white placeholder-slate-500 transition-all outline-none' placeholder='Write about mentor' rows={5} required />
        </div>

        <button type='submit' className='bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] transition-all px-10 py-3.5 mt-8 text-white font-bold tracking-wide rounded-full cursor-pointer'>Add Mentor</button>
      </div>

    </form>
  )
}

export default AddMentor

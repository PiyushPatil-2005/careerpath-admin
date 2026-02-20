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
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')

    const { backendUrl, aToken } = useContext(AdminContext)
    
    const onSubmitHandler = async (event) => {
      event.preventDefault()

      try {

        if(!menImg) {
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
        formData.append('fees', fees)
        formData.append('about', about)

        // console.log(...formData);

        formData.forEach((value, key) => {
          console.log(`${key} : ${value}`)
        })

        const {data} = await axios.post(backendUrl + '/api/admin/add-mentor', formData, { headers: { aToken }} )
        if(data.success) {
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
          setFees('')
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
    <form onSubmit={onSubmitHandler} action="" className='m-5 w-full'>

      <p className='mb-3 text-lg font-medium'>Add Mentor</p>

      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="men-img">
            <img className='w-25 bg-gray-100 rounded-full cursor-pointer' src={ menImg ? URL.createObjectURL(menImg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setMenImg(e.target.files[0])} type="file" id='men-img'  />
          <p>Upload Mentor <br /> Picture </p>
        </div>

        <div className='flex flex-col lg:flex-row items-start gap-5 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-2'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Mentor Name</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Mentor Email</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='Email' required />
            </div>
            
            <div className='flex-1 flex flex-col gap-1'>
              <p>Mentor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='Name' required />
            </div>


            <div className='flex-1 flex flex-col gap-1'>
              <p>Mentor Gender</p>
              <select onChange={(e) => setGender(e.target.value)} value={gender} className='border rounded px-3 py-2' required>
                <option value="Not Selected">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Date Of Birth</p>
              <input onChange={(e) => setDob(e.target.value)} value={dob} className='border rounded px-3 py-2' type="date" placeholder='DOB' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Phone Number</p>
              <input onChange={(e) => setPhone(e.target.value)} value={phone} className='border rounded px-3 py-2' type="number" placeholder='phone number' required />
            </div>
            
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-4'>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Speciality</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' required >
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Management">Management</option>
                <option value="Design">Design</option>
                <option value="Law">Law</option>
                <option value="Arts">Arts</option>
              </select>
            </div>
            
            <div className='flex-1 flex flex-col gap-1'>
              <p>Mentor College Name</p>
              <input onChange={(e) => setCollege(e.target.value)} value={college} className='border rounded px-3 py-2' type="text" placeholder='College Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Mentor Degree</p>
              <input onChange={(e) => setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='Name' required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <label>College Duration:</label>
                {/* Start Year */}
                <input onChange={(e) => setCollegeStartYear(e.target.value)} value={collegeStartYear} className='border rounded px-3 py-2' type="number" name="collegeStartYear" placeholder="Start Year" min="2000" max="2024" pattern="20[0-9]{2}" required />
                {/* End Year */}
                <input onChange={(e) => setCollegeEndYear(e.target.value)} value={collegeEndYear} className='border rounded px-3 py-2' type="number" name="collegeEndYear" placeholder="End Year" min="2001" max="2033" pattern="20[0-9]{2}" required />
            </div>

            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='fees' required />
            </div>

          </div>
        </div>

        <div>
            <p className='mt-4 mb-2'>About Mentor</p>
            <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded' placeholder='write about mentor' rows={5}  required/>
        </div>

        <button type='submit' className='bg-[#5F6FFF] px-10 py-3 mt-4 text-white rounded-full cursor-pointer'>Add Mentor</button>
      </div>

    </form>
  )
}

export default AddMentor

import React, {useContext, useState} from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { MentorContext } from '../context/MentorContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [state, setState] = useState('Admin')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setAToken, backendUrl } = useContext(AdminContext)
  const { setMToken } = useContext(MentorContext)
  const navigate = useNavigate()

  const onSubmitHandler = async(event) => {

    event.preventDefault()

    try {
      if(state==='Admin') {
        const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
        if(data.success) {
          localStorage.setItem('aToken', data.token)
          setAToken(data.token)
          navigate('/admin-dashboard')
        } else {
          toast.error(data.message)
        }
      } else {

        const {data} = await axios.post(backendUrl + '/api/mentor/login', {email, password})
        if (data.success) {
          localStorage.setItem('mToken', data.token)
          setMToken(data.token)
          navigate('/mentor-dashboard')
          console.log(data.token)
        } else {
          toast.error(data.message)
        }
      }
    } catch(error) {

    }
  }


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center justify-center animate-fade-up'>
      <div className='flex flex-col gap-5 m-auto items-start p-10 min-w-[340px] sm:min-w-[400px] glass-card rounded-2xl text-slate-300 text-sm'>
        <p className='text-3xl font-bold m-auto text-white'><span className='text-indigo-400'> {state} </span> Login </p>
        <div className='w-full'>
          <p className='mb-2 font-medium'>Email</p>
          <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 transition-all' type="email"  required/>
        </div>
        <div className='w-full'>
          <p className='mb-2 font-medium'>Password</p>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 transition-all' type="password"  required/>
        </div>
        <button className='bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] text-white w-full py-3 rounded-xl text-base font-semibold cursor-pointer transition-all mt-2'>Login</button>
        {
          state=== 'Admin'
          ? <p className='mt-2 text-center w-full'>Mentor Login? <span className='text-indigo-400 font-bold underline cursor-pointer hover:text-white transition-colors' onClick={()=>setState('Mentor')}>Click here</span></p>
          : <p className='mt-2 text-center w-full'>Admin Login? <span className='text-indigo-400 font-bold underline cursor-pointer hover:text-white transition-colors' onClick={()=>setState('Admin')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login

import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard'
import AllApointments from './pages/Admin/AllApointments'
import AddMentor from './pages/Admin/AddMentor'
import MentorsList from './pages/Admin/MentorsList'
import { MentorContext } from './context/MentorContext'
import MentorDashboard from './pages/Mentor/MentorDashboard'
import MentorAppointments from './pages/Mentor/MentorAppointments'
import MentorProfile from './pages/Mentor/MentorProfile'

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { mToken } = useContext(MentorContext)

  return aToken || mToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={< Dashboard />} />
          <Route path='/all-appointments' element={< AllApointments />} />
          <Route path='/add-mentor' element={< AddMentor />} />
          <Route path='/mentor-list' element={< MentorsList />} />

          {/* Mentor Route */}
          <Route path='/mentor-dashboard' element={< MentorDashboard />} />
          <Route path='/mentor-appointments' element={< MentorAppointments />} />
          <Route path='/mentor-profile' element={< MentorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
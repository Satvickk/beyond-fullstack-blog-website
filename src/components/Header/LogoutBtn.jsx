import React from 'react'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';


function LogoutBtn() {

    const Dispatch = useDispatch();
    const navigate = useNavigate();
 const handleLogout = () => {
    authService.logout().then(()=> {
        Dispatch(logout());
    })
    navigate('/')
 }

  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-black w-full sm:w-auto sm:rounded-full' onClick={handleLogout}>Logout</button>
  )
}

export default LogoutBtn

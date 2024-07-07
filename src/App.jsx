import { useEffect, useState } from 'react';

import './App.css'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';

function App() {

  const [loading, setLoading] = useState(true);
  const Dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          Dispatch(login({ userData }))
        } else {
          Dispatch(logout())
        }
      })
      .catch((error) => {
        console.log("Error ::", error)
      })
      .finally(() => setLoading(false))

  }, [])

  return (
  <div className='flex flex-wrap content-between bg-gray-400'>
    <div className='w-full block'>
      <Header />
      {!loading ? (
        <main>
          <Outlet />
        </main>
      ) : (
        <PropagateLoader color="black" loading={loading} />
      )}
      <Footer />
    </div>
  </div>
  )
}

export default App

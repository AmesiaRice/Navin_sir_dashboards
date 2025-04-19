import React from 'react'
import ClientDashboard from './components/ClientDashboard'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='p-6'>
      <Navbar/>
      <ClientDashboard/>
    </div>
  )
}

export default App

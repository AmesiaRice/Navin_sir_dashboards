import React from 'react'
import Navbar from './components/Navbar'
import ClientDashboard from './components/ClientDashboard'

const App = () => {
  return (
    <div className='p-6'>
      <Navbar/>
      <ClientDashboard/>
    </div>
  )
}

export default App

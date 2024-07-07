import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className='h-[150px] w-[150px] '>
      <img 
      src='/logo.png'
      />
    </div>
  )
}

export default Logo

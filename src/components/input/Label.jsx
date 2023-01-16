import React from 'react'

const Label = ({ children }) => {
  return (
    <label className='user-label transition-all absolute left-4 text-[#e8e8e8] pointer-events-none translate-y-[10px] peer-focus:-translate-y-1/2 peer-focus:scale-90 peer-focus:bg-black peer-focus:text-[#00C896] peer-valid:-translate-y-1/2 peer-valid:scale-90 peer-valid:bg-black peer-valid:text-[#00C896]'>
      {children}
    </label>
  )
}

export default Label

import React from 'react'

const Input = ({ children, value, onChange }) => {
  return (
    <>
      <input
        value={value}
        onChange={onChange}
        required={true}
        className='w-full p-1 input-bordered text-[#f5f5f5] focus:outline-none peer input px-5 rounded-lg'
      />
    </>
  )
}

export default Input

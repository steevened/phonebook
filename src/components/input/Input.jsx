import React, { useState } from 'react'

const Input = ({ value, onChange, setIsShort, isShort }) => {
  return (
    <>
      <input
        value={value}
        onChange={(e) => {
          setIsShort(e.target.value.length < 3)
          onChange(e)
        }}
        required={true}
        className='w-full p-1 input-bordered text-[#f5f5f5] focus:outline-none peer input focus:border-[#00C896] px-5 rounded-lg'
      />
      {isShort && (
        <p className='text-[#FF00FF] mt-2 ml-1 text-sm'>
          The name must be at least 3 characters
        </p>
      )}
    </>
  )
}

export default Input

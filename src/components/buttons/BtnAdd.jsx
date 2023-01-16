import React from 'react'
import { GrFormAdd } from 'react-icons/gr'

const BtnAdd = ({ setShowInput }) => {
  return (
    <div
      onClick={() => setShowInput(true)}
      className='fixed right-4 bottom-4 flex items-center justify-center rounded-full p-4 bg-[#83A4A3] cursor-pointer  transition-colors shadow-lg shadow-black/50'
    >
      <button>
        <GrFormAdd className='text-xl' />
      </button>
    </div>
  )
}

export default BtnAdd

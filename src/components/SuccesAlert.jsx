import React from 'react'

const SuccesAlert = ({ addedPersonName, isBarHidden, showSuccessModal }) => {
  return (
    <div
      className={`absolute border border-[#333333] rounded-lg px-7 py-4 z-50 bg-black/90 bottom-5 transition-all duration-500 flex flex-col items-center overflow-hidden ${
        showSuccessModal ? 'left-5' : '-left-full'
      }`}
    >
      <p>Added {addedPersonName}</p>
      <div
        className={`absolute bottom-0 w-full h-1 bg-[#00C896] transition-all ease-in ${
          isBarHidden
            ? '-translate-x-full duration-[3500ms]'
            : 'translate-x-0 delay-300'
        }`}
      ></div>
    </div>
  )
}

export default SuccesAlert

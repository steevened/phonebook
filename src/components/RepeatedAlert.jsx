import { useEffect, useState } from 'react'

const RepeatedAlert = ({
  nameRepeated,
  setShowNameModal,
  showNameModal,
  loaderTime,
  setloaderTime,
}) => {
  useEffect(() => {
    if (showNameModal && loaderTime >= 0) {
      setTimeout(() => {
        setloaderTime(loaderTime - 10)
      }, 2)
    }
  }, [showNameModal, setloaderTime, setShowNameModal])
  return (
    <div
      className={`${
        showNameModal ? 'top-7' : '-top-full'
      } border border-[#333333] rounded-lg px-7 py-4 z-50 absolute -translate-x-1/2 left-1/2 transition-all duration-500 text-sm md:text-lg text-center w-5/6 sm:w-4/6 max-w-lg flex flex-col items-center gap-5`}
    >
      <p>{nameRepeated} is already added to phonebook</p>
      <button
        className='border-[#333333] hover:border-[#00C896] hover:text-[#00C896] border px-4 py-1  rounded-lg transition-all w-fit'
        onClick={() => setShowNameModal(false)}
      >
        Ok
      </button>
      <div
        className={`absolute w-[${loaderTime}%] h-1 bottom-0 bg-[#00C896] transition-all duration-500 ease-in-out`}
      ></div>
    </div>
  )
}

export default RepeatedAlert

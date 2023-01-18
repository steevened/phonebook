import { useEffect, useState } from 'react'

const RepeatedAlert = ({
  nameRepeated,
  setShowNameModal,
  showNameModal,
  loaderTime,
  setLoaderTime,
  setUpdatePerson,
  handleUpdatePerson,
  persons,
  newName,
}) => {
  const handleConfirm = () => {
    const nameExist = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    // setLoaderTime(false)
    setUpdatePerson(true)
    handleUpdatePerson(nameExist)
  }

  return (
    <div
      className={`${
        showNameModal ? 'top-7' : '-top-full'
      } border border-[#333333] rounded-lg px-7 py-4 z-50 absolute -translate-x-1/2 left-1/2 transition-all duration-500 text-sm md:text-lg text-center w-5/6 sm:w-4/6 max-w-lg flex flex-col items-center gap-2 overflow-hidden`}
    >
      <p>
        {nameRepeated} is already added to phonebook, replace the old number
        with a new one?
      </p>
      <div className='flex gap-2'>
        <button
          className='border-[#333333] hover:border-[#00C896] hover:text-[#00C896] border px-4 py-1  rounded-lg transition-all w-fit'
          onClick={() => {
            setShowNameModal(false)
            setLoaderTime(false)
            setUpdatePerson(false)
          }}
        >
          Cancel
        </button>
        <button
          className='border-[#333333] hover:border-[#00C896] hover:text-[#00C896] border px-4 py-1  rounded-lg transition-all w-fit'
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>

      <div
        className={`absolute w-full ${
          loaderTime
            ? '-translate-x-0 duration-75 delay-300'
            : '-translate-x-full duration-[2500ms] delay-500'
        } h-1 bottom-0 bg-[#00C896] transition-all  ease-in`}
      ></div>
    </div>
  )
}

export default RepeatedAlert

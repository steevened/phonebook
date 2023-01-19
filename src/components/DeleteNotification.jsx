import React from 'react'

const DeleteNotification = ({
  userToDelete,
  showDeleteModal,
  setShowDeleteModal,
  setConfirmDelete,
  handleDelete,
  idsChecked,
}) => {
  return (
    <div
      className={`${
        showDeleteModal ? 'top-2' : '-top-full'
      } border border-[#333333] bg-black rounded-lg px-7 py-4 z-50 absolute -translate-x-1/2 left-1/2 transition-all duration-500 text-sm md:text-lg text-center w-4/6 sm:w-2/6 max-w-lg flex flex-col items-center gap-2 overflow-hidden`}
    >
      {idsChecked.length === 1 ? (
        <p>Delete {userToDelete[0]?.name}?</p>
      ) : (
        <p>Delete {idsChecked.length} Users</p>
      )}

      <div className='flex gap-2'>
        <button
          className='border-[#333333] hover:border-[#00C896] hover:text-[#00C896] border px-4 py-1  rounded-lg transition-all w-fit'
          onClick={() => {
            setShowDeleteModal(false)
          }}
        >
          Cancel
        </button>
        <button
          className='border-[#333333] hover:border-[#00C896] hover:text-[#00C896] border px-4 py-1  rounded-lg transition-all w-fit'
          onClick={handleDelete}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default DeleteNotification

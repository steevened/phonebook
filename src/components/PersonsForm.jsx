import React from 'react'

const PersonsForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
  showInput,
}) => {
  return (
    <form
      className={`absolute inset-0 transition-all ease-in-out duration-700  border-[#333] hover:border-white border rounded-lg flex items-center justify-center flex-col z-20 bg-black -translate-x-1/2 h-1/2  left-1/2  ${
        showInput ? 'top-1/2 -translate-y-1/2' : '-translate-y-full top-0'
      }`}
      onSubmit={handleSubmit}
    >
      <label htmlFor='name'>Name</label>

      <input
        id='name'
        className='text-black w-full'
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <label htmlFor='number'>Number</label>
      <input
        id='number'
        className='text-black w-full'
        value={newNumber}
        onChange={(e) => setNewNumber(e.target.value)}
      />

      <div>
        <button type='submit'>Add</button>
      </div>
    </form>
  )
}

export default PersonsForm

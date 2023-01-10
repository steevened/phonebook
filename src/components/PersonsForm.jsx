import React from 'react'

const PersonsForm = ({
  handleSubmit,
  newName,
  setNewName,
  newNumber,
  setNewNumber,
}) => {
  return (
    <form
      className='absolute inset-0 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 border flex items-center justify-center flex-col z-20 bg-black'
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

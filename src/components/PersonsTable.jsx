import React, { useState } from 'react'
import { IoTrashOutline } from 'react-icons/io5'

const PersonsTable = ({
  persons,
  idsChecked,
  handleCheckbox,
  handleDelete,
}) => {
  const [isAllDisabled, setIsAllDisabled] = useState(false)

  // console.log(idsChecked)

  return (
    <div className='table border  rounded-xl overflow-hidden'>
      <div className='head'>
        <div className='row flex justify-between  p-4'>
          <div className='th '>
            <input
              type='checkbox'
              onChange={(e) => setIsAllDisabled(e.target.checked)}
            />
          </div>
          <div className='th'>Name</div>
          <div className='th'>Number</div>
        </div>
      </div>
      <div className='body'>
        {persons.map((person) => (
          <div
            key={person.id}
            className='tr flex justify-between border-t py-3 px-4'
          >
            <div>
              <input
                id={person.id}
                type='checkbox'
                onChange={(e) => handleCheckbox(e)}
              />
            </div>

            <div className='td'>
              <p>{person.name}</p>
            </div>
            <div className='td'>
              <p>{person.number}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='ft border-t py-5'>
        <button onClick={handleDelete}>
          <IoTrashOutline />
        </button>
      </div>
    </div>
  )
}

export default PersonsTable

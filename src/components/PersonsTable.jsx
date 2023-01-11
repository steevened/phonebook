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
    <div className='overflow-hidden w-5/6 sm:w-4/6 max-w-lg mx-auto absolute top-12 shadow-lg shadow-black/60'>
      <div className='head bg-neutral-900'>
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
      <div className='body bg-neutral-700 overflow-auto'>
        {persons.map((person) => (
          <div
            key={person.id}
            className='tr flex justify-between border-t border-neutral-500 py-3 px-4'
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
      <div className='ft border-t py-2 border-neutral-500 bg-neutral-900 flex justify-between items-center px-5 h-12'>
        <div>
          {idsChecked.length <= 0 ? (
            <p></p>
          ) : idsChecked.length === 1 ? (
            <p>1 User selected</p>
          ) : (
            <p>{`${idsChecked.length}`} Users selected</p>
          )}
        </div>

        <button
          onClick={handleDelete}
          disabled={idsChecked.length <= 0 ? true : false}
        >
          <IoTrashOutline
            className={`transition-all ${
              idsChecked.length <= 0 ? 'scale-0' : 'scale-100'
            }`}
          />
        </button>
      </div>
    </div>
  )
}

export default PersonsTable

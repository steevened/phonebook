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
    <div className='overflow-hidden w-5/6 sm:w-4/6 max-w-lg mx-auto absolute top-12 bottom-12 shadow-lg shadow-black/60 rounded-md flex flex-col'>
      <div className='bg-[#111111] row flex justify-between items-center px-4 h-16'>
        <div className='th flex-[0.3] '>
          {/* <input
            type='checkbox'
            onChange={(e) => setIsAllDisabled(e.target.checked)}
            className='checkbox'
          /> */}
        </div>
        <div className='th flex-1  text-left font-bold'>Name</div>
        <div className='th flex-1  text-left font-bold'>Number</div>
      </div>
      <div className='body bg-[#333333] overflow-y-auto w-full h-full'>
        {persons.map((person) => (
          <div
            key={person.id}
            className='tr flex justify-between  shadow-[inset_0_-1px_0_0_hsla(0,0%,100%,.1)] py-3 px-4'
          >
            <div className='flex-[0.3]  '>
              <input
                id={person.id}
                type='checkbox'
                onChange={(e) => handleCheckbox(e)}
                className='checkbox '
              />
            </div>

            <div className='td flex-1  text-left'>
              <p>{person.name}</p>
            </div>
            <div className='td flex-1  text-left'>
              <p>{person.number}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='bg-[#111111] flex justify-between items-center px-5 h-12  w-full'>
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

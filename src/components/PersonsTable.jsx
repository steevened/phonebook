import React, { useState } from 'react'

const PersonsTable = ({ persons }) => {
  const [isDisabled, setIsDisabled] = useState(false)
  const [idsChecked, setIdsChecked] = useState([])
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      if (!idsChecked.includes(e.target.id))
        setIdsChecked(idsChecked.concat(e.target.id))
    } else {
      setIdsChecked(idsChecked.filter((id) => id !== e.target.id))
    }
  }

  console.log(idsChecked)

  return (
    <div className='table border  rounded-xl overflow-hidden'>
      <div className='head'>
        <div className='row flex justify-between  p-4'>
          <div className='th '>
            <input type='checkbox' />
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
      <div className='ft border-t py-5'></div>
    </div>
  )
}

export default PersonsTable

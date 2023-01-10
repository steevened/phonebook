import React, { useState } from 'react'

const PersonsTable = ({ persons }) => {
  const [isDisabled, setIsDisabled] = useState(false)

  return (
    <div className='table border'>
      <div className='head'>
        <div className='row flex'>
          <div className='th'>
            <input
              type='checkbox'
              onChange={() => {
                setIsDisabled(!isDisabled)
              }}
            />
          </div>
          <div className='th'>Name</div>
          <div className='th'>Number</div>
        </div>
      </div>
      <div className='body'></div>
    </div>
    // <table className=''>
    //   <thead className='border'>
    //     <tr className=''>
    //       <th className='border-r-2 w-10 h-10'>
    //         <input
    //           className=''
    //           type='checkbox'
    //           onChange={() => {
    //             setIsDisabled(!isDisabled)
    //           }}
    //         />
    //       </th>
    //       <th className='border-r-2'>Name</th>
    //       <th>Number</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {persons.map((person) => (
    //       <tr key={person.id} className='border'>
    //         {isDisabled ? (
    //           <td className=' h-10 w-10 border-r-2 flex items-center justify-center'>
    //             <input type='checkbox' checked />
    //           </td>
    //         ) : (
    //           <td className='h-10 w-10 border-r-2 flex items-center justify-center'>
    //             <input type='checkbox' />
    //           </td>
    //         )}

    //         <td className='border-r-2'>{person.name}</td>
    //         <td className=''>{person.number}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
  )
}

export default PersonsTable

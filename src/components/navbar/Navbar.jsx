import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneSquareAlt } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className='bg-black shadow-[inset_0_-1px_0_0_hsla(0,0%,100%,.1)] fixed top-0 w-full py-2'>
      <Link className='tracking-wider font-bold ' to='/'>
        <div className='flex items-center justify-center gap-2'>
          <FaPhoneSquareAlt className='text-5xl pt-2' />
          <h2 className='text-2xl'>
            <span className='text-sm'>Public</span> <br /> PhoneBook
          </h2>
        </div>
      </Link>
    </div>
  )
}

export default Navbar

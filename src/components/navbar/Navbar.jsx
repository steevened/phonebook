import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneSquareAlt } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className='bg-black shadow-[inset_0_-1px_0_0_hsla(0,0%,100%,.1)] fixed top-0 w-full text-center py-4 md:py-5'>
      <Link className='text-xl tracking-wider font-bold ' to='/'>
        <div className='flex items-center justify-center gap-2'>
          <FaPhoneSquareAlt className='text-3xl' />
          <h2>PhoneBook</h2>
        </div>
      </Link>
    </div>
  )
}

export default Navbar

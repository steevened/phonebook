import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhoneSquareAlt } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div className='bg-black fixed top-0 w-full text-center py-4 md:py-5 shadow-black/50 shadow-lg'>
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

import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='bg-slate-900 fixed top-0 w-full text-center py-4 md:py-5 shadow-black/50 shadow-lg'>
      <Link className='text-xl tracking-wider font-bold ' to='/'>
        PhoneBook
      </Link>
    </div>
  )
}

export default Navbar

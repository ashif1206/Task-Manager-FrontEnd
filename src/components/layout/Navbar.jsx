import React, { useState } from 'react'
import { HiOutlineX, HiOutlineMenu } from 'react-icons/hi'
import SideMenu from './SideMenu'

function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <div className='flex items-center justify-between bg-white border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-4 sm:px-6 md:px-7 sticky top-0 z-30'>
      {/* Left Side: Logo and Hamburger */}
      <div className='flex items-center gap-4'>
        <button
          className='block lg:hidden text-black'
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>
        <h2 className='text-lg font-medium text-black'>Task Manager</h2>
      </div>

      {openSideMenu && (
        <div className='fixed top-[61px] left-0 w-64 h-[calc(100vh-61px)] bg-white shadow-lg z-40'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar

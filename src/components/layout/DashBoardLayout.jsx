import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

function DashBoardLayout({children,activeMenu}) {
    const {user} = useContext(UserContext)
    return (
      <div className=''>
        <Navbar activeMenu={activeMenu} />
        {
            user ? (
                <div className='flex flex-col lg:flex-row'>
                    <div className='hidden lg:block w-full lg:w-64'>
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className='grow w-full px-4 md:px-8 lg:px-12 xl:px-20'>
                        {children}
                    </div>
                </div>
            ) : null 
        }
      </div>
    )
}


export default DashBoardLayout;

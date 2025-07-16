import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

function SideMenu({ activeMenu }) {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  function handleClick(route) {
    if (route === "logout") {
      handleLogOut();
      return;
    }

    navigate(route);
  }

  function handleLogOut() {
    localStorage.clear();
    clearUser();
    navigate("/login");
  }

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === "admin" ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
    return () => { };
  }, [user]);

    const imageBaseURL = "https://task-manager-backend-9sjd.onrender.com";

const correctedImageUrl = user?.profileImageUrl?.includes("localhost")
  ? user.profileImageUrl.replace("http://localhost:8000", imageBaseURL)
  : user?.profileImageUrl;

  return (
    <div className='w-full max-w-xs h-full md:h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 md:sticky md:top-[61px] z-20 overflow-y-auto'>
      <div className='flex flex-col items-center justify-center mb-7 pt-5'>
        <div className='relative'>
          <img
            src={correctedImageUrl || "/default-avatar.png"}
            alt='Profile Image'
            className='w-20 h-20 bg-slate-400 rounded-full object-cover'
          />
        </div>

        {user?.role === 'admin' && (
          <div className='text-[10px] font-medium text-white bg-blue-600 px-3 py-0.5 rounded mt-1'>
            Admin
          </div>
        )}

        <h5 className='text-gray-950 font-medium leading-6 mt-3'>{user?.name || "USERNAME"}</h5>
        <p className='text-[12px] text-gray-500 break-all text-center px-4'>{user?.email || ""}</p>
      </div>

      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label
              ? "text-blue-600 bg-gradient-to-r from-blue-50/40 to-blue-100/50 border-r-4 border-blue-600"
              : ""
          } py-3 px-6 mb-3 cursor-pointer transition-all`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          <span className="whitespace-nowrap">{item?.label}</span>
        </button>
      ))}
    </div>
  );
}

export default SideMenu;

import React from 'react'

function UserCard({userInfo}) {
  return (
    <div className='user-card p-2'>
        <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
        <img 
        className='w-14 h-14 rounded-full border-2 border-white'
        src={userInfo?.profileImageUrl} 
        alt={"Avatar"} />
        <div className=''>
            <p className='text-sm font-medium'>{userInfo?.name}</p>
            <p className='text-xs text-gray-500'>{userInfo?.email}</p>
        </div>

    </div>
    </div>
    <div className='flex items-end gap-3 mt-5'>
        <StatCard
        label="Pending"
        count={userInfo?.pendingTasks || 0}
        status="Pending"
        />
        <StatCard
        label="In Progress"
        count={userInfo?.inProgressTask || 0}
        status="In Progress"
        />
        <StatCard
        label="Completed"
        count={userInfo?.completedTask || 0}
        status="Completed"
        />
    </div>
    </div>
  )
}

export default UserCard;


const StatCard = ({ label, count, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "In Progress":
        return "text-cyan-500 bg-gray-50";
      case "Completed":
        return "text-indigo-500 bg-gray-50";
      default:
        return "text-violet-500 bg-gray-50";
    }
  };

  return (
    <div className={`flex-1 text-[10px]  font-medium ${getStatusColor()} px-4 py-0.5 rounded`}>
      <span className="text-[12px] font-semibold">{count}</span>
      <br />
      {label}
    </div>
  );
};

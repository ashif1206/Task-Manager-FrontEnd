import React from 'react'

function TaskStatusTab({tabs,activeTabs,setActiveTabs}) {
    
  return (
    <div className='mt-2'>
        <div className='flex'>
            {tabs.map((tab)=>(
                <button 
                className={`relative px-3 md:px-4 py-2 text-sm font-medium ${activeTabs === tab.label ? 'text-blue-600' :'text-gray-500 hover:text-gray-700'} cursor-pointer`}
                key={tab.label}
                onClick={()=>setActiveTabs(tab.label)}
                >
                    <div className='flex items-center'>
                        <span className='tex-xs'>{tab.label}</span>
                        <span 
                        className={`text-xs ml-2 px-2 py-0.5 rounded-full ${activeTabs === tab.label ? "bg-blue-700 text-white":" bg-gray-200/70 text-gray-600"}`}>
                                {tab.count}
                        </span>
                    </div>
                    {activeTabs === tab.label &&(
                        <div className='absolute bottom-0 left-0 w-full h-0.5 bg-blue-600'></div>
                    )}
                </button>
            ))}
        </div>        
    </div>
  )
}

export default TaskStatusTab
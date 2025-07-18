import React from 'react'

function Progress({progress,status}) {
  function getColor(){
    switch(status){
        case "In Progress": return "text-cyan-50 bg-cyan-500 border border-cyan-500/10"
            case "Completed": return "text-indigo-50 bg-indigo-500 border border-indigo-500/20"
            default: return "text-violet-50 bg-violet-500 border border-violet-500/10"
    };
  };



  return (
    <div className='w-full bg-gray-200 rounded-full h-1.5'>
      <div className={`${getColor()} h-1.5 rounded-full text-center text-xs font-medium`} style={{width:`${progress}`}}>

      </div>
    </div> 
  )
}

export default Progress
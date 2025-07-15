import React from 'react'

function InfoCard({value,color,label}) {
  return (
    <div className='flex items-center gap-3'>
        <div className={`w-2 md:w-2 md:h-5 ${color} rounded-full`} />

        <p className='text-xs md:text[14px] text-gray-500 '>
            <span className='text-sm md:text-[15px] text-black font-semibold mr-1'>{value}</span>
            {label}
        </p>
    </div>
  )
}

export default InfoCard
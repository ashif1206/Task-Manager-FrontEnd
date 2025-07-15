import React, { useState } from 'react'
import { LuChevronDown } from 'react-icons/lu'

function SelectDropDown({ option, value, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)

  function handleSelect(option) {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className='relative w-full'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full text-sm text-black outline-none bg-white border border-slate-100 px-2.5 py-3 rounded-md mt-2 flex justify-between items-center'
      >
        {value ? option.find((opt) => opt.value === value)?.label : placeholder}
        <span className='ml-2'>
          <LuChevronDown />
        </span>
      </button>
      {isOpen && (
        <div className='absolute w-full bg-white border border-slate-100 rounded-md mt-1 shadow-md z-10'>
          {option.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className='px-3 py-2 text-sm cursor-pointer hover:bg-gray-100'
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SelectDropDown

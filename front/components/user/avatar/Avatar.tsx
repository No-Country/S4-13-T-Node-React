import React from 'react'

function Avatar() {
  return (
    <div className='flex flex-col '>
    <div className='relative' >
       <input  className="opacity-0 mt-6 ml-3 rounded-full border border-secondary w-[127px] h-[127px]" type="file" name="" id="" />
       <img className="pointer-events-none absolute bottom-0 opacity-100 mt-6 ml-3 rounded-full border border-secondary w-[127px] h-[127px]" src='/assets/Ellipse-11.png' />
    </div>
    <h3 className='ml-3 font-roboto text-center font-bold'>48 me gusta totales</h3>
    </div>
  )
}

export default Avatar
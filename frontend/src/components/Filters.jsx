import React from 'react'

const Filters = () => {
  return (
    <div className='h-[500px]  rounded-md w-[250px] p-2 text-zinc-600'>
        <div>
            <h1 className='text-black text-3xl font-semibold ml-10'>Filter Jobs</h1>
            <div className='flex flex-col gap-1 py-3 '>
                <h1 className='text-2xl  text-black font-lg'>Location</h1>
                <label>
                <input type='radio'/>
                Delhi-ncr
                </label>
                <label>
                <input type='radio'/>
                Pune
                </label>
                <label>
                <input type='radio'/>
                Indore
                </label>
                <label>
                <input type='radio'/>
                Banglore
                </label>
                <label>
                <input type='radio'/>
                Mumbai
                </label>
                <label>
                <input type='radio'/>
                Hyderabad
                </label>
            </div>

            <div className='flex flex-col gap-1'>
                <h1 className='text-2xl text-black font-lg'>Industry</h1>
                <label>
                <input type='radio'/>
                Frontend-developer
                </label>
                <label>
                <input type='radio'/>
                Frontend-developer
                </label>
                <label>
                <input type='radio'/>
                Frontend-developer
                </label>
                <label>
                <input type='radio'/>
                Frontend-developer
                </label>
            </div>

            <h1 className='text-2xl mt-2 text-black font-lg'>Salary</h1>
            <div className='flex gap-2 mt-2'>
                <label>
                <input type='radio'/>
                  20k-50k
                </label>
                <label>
                <input type='radio'/>
                  20k-50k
                </label>
                <label>
                <input type='radio'/>
                  20k-50k
                </label>
            </div>
        </div>
    </div>
  )
}

export default Filters
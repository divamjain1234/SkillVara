import React, { useContext } from 'react'
import {useForm} from 'react-hook-form'
import {AuthContext} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
  const navigate=useNavigate()
  const{signup,user}=useContext(AuthContext)
  const {register,handleSubmit}=useForm()
  const postsubmit=async (data)=>{
    await signup(data)
    navigate('/main')
  }
    return (
      <div className='w-full h-screen bg-[#798E9B] px-[90px] py-[70px]'>
      <div className='w-[360px] text-black bg-zinc-200 px-4 py-3 h-94 mx-auto border-[2px] border-zinc-800 rounded-lg'>
        <h1 className='text-4xl font-semibold ml-22'>Sign up</h1>
      <form className='flex flex-col gap-10 p-6' action="" onSubmit={handleSubmit(postsubmit)}>
     <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('username')} type="text" placeholder='Username'/>
     <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('email')} type="email" placeholder=' Email'/>
     <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('password')} type="password" placeholder='Password'/>
     <input className='w-[160px] h-[42px] px-6 rounded-xl text-2xl border-2 py-1 text-white bg-[#3495E1]' type="submit" value="Sign up"/>
      </form>
      </div>
    </div>
  )
}


export default Signup

import React, { useContext, useState } from 'react'
import {useForm} from 'react-hook-form'
import {AuthContext} from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
const Signup = () => {
  const navigate=useNavigate()
  const [params]=useSearchParams()
  const role=params.get('role')==='employer' ? 'employer' : 'candidate'
  const{signup}=useContext(AuthContext)
  const {register,handleSubmit}=useForm()
  const [error,setError]=useState('')
  const postsubmit=async (data)=>{
    const result=await signup({...data,role})
    if(!result.success){
      setError(result.error?.message || 'Signup failed')
      return
    }
    navigate(role==='employer' ? '/employer' : '/main')
  }
    return (
      <div className='w-full min-h-screen bg-[#798E9B] px-[90px] py-[70px]'>
      <div className='w-[360px] text-black bg-zinc-200 px-4 py-3 mx-auto border-[2px] border-zinc-800 rounded-lg'>
        <h1 className='text-4xl font-semibold text-center'>{role==='employer' ? 'Employer sign up' : 'Sign up'}</h1>
      <form className='flex flex-col gap-8 p-6' action="" onSubmit={handleSubmit(postsubmit)}>
     <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('username')} type="text" placeholder='Username'/>
     {role==='employer' && <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('companyName')} type="text" placeholder='Company name'/>}
     <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('email')} type="email" placeholder=' Email'/>
     <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('password')} type="password" placeholder='Password (min 6 characters)'/>
     {error && <p className='text-red-600 -my-4'>{error}</p>}
     <input className='w-[160px] h-[42px] px-6 rounded-xl text-2xl border-2 py-1 text-white bg-[#3495E1]' type="submit" value="Sign up"/>
      </form>
      </div>
    </div>
  )
}


export default Signup

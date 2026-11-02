import { useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthContext"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
const Login = () => {
  const navigate=useNavigate()
    const {register,handleSubmit}=useForm()
    const {login}=useContext(AuthContext)
    const [error,setError]=useState('')

    const postsubmit=async (data)=>{
     const result=await login(data)
     if(!result.success){
       setError(result.error?.message || 'Login failed')
       return
     }
     navigate(result.data.user.role==='employer' ? '/employer' : '/main')
    }
  return (
    <div className='w-full h-screen bg-[#87A0B2] px-[90px] py-[70px]'>
      <div className='w-[360px] text-black bg-white px-4 py-3 h-94 mx-auto border-[2px] border-zinc-800 rounded-lg'>
        <h1 className='text-4xl font-semibold ml-22'>Login</h1>
      <form className='flex flex-col gap-10 p-6' action="" onSubmit={handleSubmit(postsubmit)}>
     <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('email')} type="email" placeholder=' Email'/>
     <input className='border-[2.5px] rounded-lg py-1 px-2 border-zinc-600' {...register('password')} type="password" placeholder='Password'/>
     {error && <p className='text-red-600 -my-6'>{error}</p>}
     <input className='w-[160px] h-[42px] px-6 rounded-xl text-2xl border-2 py-1 text-white bg-[#F90093]' type="submit" value="Login"/>
      </form>
      </div>
    </div>
  )
}

export default Login

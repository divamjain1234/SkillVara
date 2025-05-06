import React, { useContext } from 'react'
import{Link} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import Button from './Button'
const Navbar = () => {
    const {user}=useContext(AuthContext) 
    console.log(user)
    const initial=user?user.username.charAt(0).toUpperCase() : '';
  return (
<div className='w-full h-16 fixed'>
     <div className="h-full w-full bg-[#d6d7d8] flex justify-between items-center">
        <div className="links flex justify-center items center gap-8 text-zinc-800 ">
        <h1 className="text-xl ml-8 font-medium mt-2 text-zinc-700" >SkillVara</h1>
     <a className="text-base ml-8 font-medium " href="#">internships</a>
     <a className="text-base font-medium "  href="#">jobs</a>
     <a className="text-base font-medium "  href="#">companies</a>
        </div>

        {user?<div className=" login flex justify-center items center gap-12 mr-14 font-semibold"><Link to={'/'}>home</Link>
        <Link className='text-[#f50b0b]' to={'/logout'}>logout</Link>
        <Link to={'/profile'}>
        <div className='rounded-full h-7 w-7 bg-[#7dddea] text-black '><h1 className='px-[7px] py-[1.5px]'>{initial}</h1></div>
        </Link></div>:<div className=" buttons flex justify-center items center gap-3 mr-6" >
            <Button name={'Login'}to={'/login'}/>
            <Button name={'Candidate-Sign-up'}to={'/signup'}/>
            <Button name={'Employer-Sign-up'}/>
          </div>
    }
     </div>
</div>
  )
}

export default Navbar
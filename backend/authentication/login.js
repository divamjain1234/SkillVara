const usermodel=require('../models/user')
const bcrypt=require ('bcrypt')
const jwt = require('jsonwebtoken');

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

const login=async(req,res)=>{
  try {
    let{email,password}=req.body;
    if(typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password){
      return res.status(400).json({message:'Email and password are required'})
    }
    const loginuser=await usermodel.findOne({email:email.trim()})
    // Same message for "no such user" and "wrong password", so nobody can probe which emails exist.
    // Previously these returned HTTP 200 with a plain string, so the frontend treated a wrong password as a successful login.
    const ok = loginuser ? await bcrypt.compare(password,loginuser.password) : false
    if(!ok){
      return res.status(401).json({message:'Invalid email or password'})
    }
    const token=jwt.sign({id:loginuser._id,email:loginuser.email},process.env.JWT_SECRET,{expiresIn:'7d'})
    res.cookie('token',token,{
      httpOnly:true,
      sameSite:'None',
      secure:true,
      maxAge:SEVEN_DAYS
    })
    res.status(202).json({
      message:'login successfully',
      user:{
        username:loginuser.username,
        email:loginuser.email,
        role:loginuser.role,
        companyName:loginuser.companyName
      }
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Server error'})
  }
}
module.exports={login}

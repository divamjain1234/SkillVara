const usermodel=require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userprofilemodel=require('../models/userprofile')
const signup=async (req,res)=>{
    try {
        let{email,password,username}=req.body
        const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newuser=await usermodel.create({
      username,
      email,
      password:hashedPassword
    })
    let userprofile=await userprofilemodel.create({
      username:newuser.username,
      email:newuser.email
    })
    let token=jwt.sign({id:newuser._id,email:newuser.email},process.env.JWT_SECRET)
    res.cookie('token',token,{
      httpOnly:true,
      sameSite:'None',
      secure:true
    })
    res.status(202).json({
      message:'user created successfully',
      user:{
        username:newuser.username,
        email:newuser.email,
      }
    })
    } catch (error) {
        console.log(error)
    }
    
  }
  
  module.exports={signup}

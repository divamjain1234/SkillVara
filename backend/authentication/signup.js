const usermodel=require('../models/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userprofilemodel=require('../models/userprofile')

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000

const signup=async (req,res)=>{
    try {
        let{email,password,username,role,companyName}=req.body
        email = typeof email === 'string' ? email.trim() : ''
        username = typeof username === 'string' ? username.trim() : ''

        if(!email || !username || !password){
          return res.status(400).json({message:'Username, email and password are required'})
        }
        if(typeof password !== 'string' || password.length < 6){
          return res.status(400).json({message:'Password must be at least 6 characters'})
        }
        role = role === 'employer' ? 'employer' : 'candidate'
        if(role === 'employer' && !(typeof companyName === 'string' && companyName.trim())){
          return res.status(400).json({message:'Company name is required for employers'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let newuser=await usermodel.create({
          username,
          email,
          password:hashedPassword,
          role,
          companyName: role === 'employer' ? companyName.trim() : undefined
        })
        if(role === 'candidate'){
          await userprofilemodel.create({
            user:newuser._id,
            username:newuser.username,
            email:newuser.email
          })
        }
        let token=jwt.sign({id:newuser._id,email:newuser.email},process.env.JWT_SECRET,{expiresIn:'7d'})
        res.cookie('token',token,{
          httpOnly:true,
          sameSite:'None',
          secure:true,
          maxAge:SEVEN_DAYS
        })
        res.status(202).json({
          message:'user created successfully',
          user:{
            username:newuser.username,
            email:newuser.email,
            role:newuser.role,
            companyName:newuser.companyName
          }
        })
    } catch (error) {
        if(error.code === 11000){
          return res.status(409).json({message:'Username or email is already registered'})
        }
        console.log(error)
        res.status(500).json({message:'Server error'})
    }
  }

  module.exports={signup}

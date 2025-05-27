const usermodel=require('../models/user')
const bcrypt=require ('bcrypt')
const jwt = require('jsonwebtoken');
const login=async(req,res)=>{
  let{email,password}=req.body;
   let loginuser=await usermodel.findOne({email})
   if(!loginuser){
   res.send('email is incorrect')
   }else{
      bcrypt.compare(password,loginuser.password, function(err, result) {
      if(result){
           let token=jwt.sign({id:loginuser._id,email:loginuser.email},process.env.JWT_SECRET)
              res.cookie('token',token,{
                httpOnly:true,
                sameSite:'None',
                secure:true
              })
              res.status(202).json({
                message:'login successfully',
                user:{
                   username:loginuser.username,
                   email:loginuser.email
                }
              })
      }else{
       res.send('password is incorrect')
      }
      })
   }
}
module.exports={login}

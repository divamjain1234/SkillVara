const express=require('express')
const router=express.Router()
const {profileview} =require('../functions/profileview')
const{signup}=require('../authentication/signup')
const{login}=require('../authentication/login')
const{logout}=require('../authentication/logout')
const {isloggedin}=require('../middlewares/isloggedin')
const { createprofile } = require('../authentication/profile')
const upload=require('../config/multerconfig')
router.post('/signup',signup)
router.post('/login',login)
router.get('/auth',isloggedin,(req,res)=>{
    res.json({isAuthenticated:true,user:req.user})
})
router.post('/createprofile',upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'refrence', maxCount: 1 },
  ]),createprofile)
router.post('/logout',logout)
router.get('/profileview',profileview)
module.exports=router
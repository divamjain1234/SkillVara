const usermodel=require('../models/user')
const jwt=require ('jsonwebtoken')
const isloggedin=async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.status(401).json({isAuthenticated:false,user:null})
    }else{
   try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const userr=await  usermodel.findById(data.id).select('username email');
    req.user=userr;
    next()
   } catch (error) {
    console.log(error)
    return res.status(401).json({isAuthenticated:false, user: null }); 
   }
    }
}
module.exports={isloggedin}
const logout=(req,res)=>{
    
    res.clearCookie('token',{httpOnly:true,sameSite:'None',secure:true})
    res.json({message:'user logout'})
}
module.exports={logout}

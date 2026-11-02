const logout=(req,res)=>{
    // Options must match the ones used when the cookie was set, or browsers keep the cookie.
    res.clearCookie('token',{httpOnly:true,sameSite:'None',secure:true})
    res.json({message:'user logout'})
}
module.exports={logout}

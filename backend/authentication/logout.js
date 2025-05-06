const logout=(req,res)=>{
    res.clearCookie('token')
    res.send('user logout')
}
module.exports={logout}
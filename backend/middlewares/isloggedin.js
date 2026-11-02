const usermodel=require('../models/user')
const jwt=require ('jsonwebtoken')

const loadUser = async (token) => {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    return usermodel.findById(data.id).select('username email role companyName');
}

const isloggedin=async(req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({isAuthenticated:false,user:null})
    }
    try {
        const user = await loadUser(token)
        if(!user){
            return res.status(401).json({isAuthenticated:false,user:null})
        }
        req.user=user;
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({isAuthenticated:false, user: null });
    }
}

// Like isloggedin, but never blocks: sets req.user when a valid cookie exists.
// Used on public pages that show extra info to logged-in users.
const optionalauth=async(req,res,next)=>{
    const token = req.cookies.token;
    if(token){
        try {
            req.user = await loadUser(token)
        } catch (error) {
            req.user = null
        }
    }
    next()
}

// Use after isloggedin: requireRole('employer')
const requireRole = (role) => (req, res, next) => {
    if (!req.user || req.user.role !== role) {
        return res.status(403).json({ message: `Only ${role}s can do this` })
    }
    next()
}

module.exports={isloggedin, optionalauth, requireRole}

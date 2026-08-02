const User = require("../model/user.model");
const jwt = require("jsonwebtoken");

async function isLogin(req,res,next){
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        req.userId = decoded.id
        next();
    } catch (error) {
        console.error("Authorization Error:", error);
        return res.status(401).json({
        success: false,
        message: "Authorization failed",
        });
    }

}

module.exports = isLogin;
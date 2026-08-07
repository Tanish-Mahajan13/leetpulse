const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.postRegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password."
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists."
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error during user registration"
    });
  }
};

module.exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Please provide email."
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Please provide password."
            });
        }

        const tempUser = await User.findOne({email:email}).select('+password');
        if(!tempUser){
            return res.status(400).json({
                success:false,
                message:"User with this email does not exist pls register first"
            })
        }

        const isMatch = await bcrypt.compare(password, tempUser.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Incorrect Password"
            });
        }

        const token = jwt.sign(
            { id: tempUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
            );
        res.cookie("token",token);
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user: {
                id: tempUser._id,
                name: tempUser.name,
                email: tempUser.email
            }
        });

    }
    catch(error){
        console.error("Login Error:", error);
        res.status(500).json({
        success: false,
        message: "Server Error during user login",
        error
        });
    }
}

module.exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Get Me Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

module.exports.logoutUser = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};
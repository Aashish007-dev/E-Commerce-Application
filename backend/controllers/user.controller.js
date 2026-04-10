import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import validator from "validator";
import bcrypt from "bcrypt";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}


// User
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: 'User not found'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            const token = createToken(user._id);
            res.json({success: true, message: 'User logged in successfully', token});
        }else{
            res.json({success: false, message: 'Invalid credentials'});
        }

    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error logging in user', error});
    }
}


const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.json({success: false, message: 'User already exists'});
        }

        // Validating email & strong password
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: 'Invalid email'});
        }

        if (password.length < 8) {
            return res.json({success: false, message: 'Password must be at least 8 characters long'});
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        const token = createToken(user._id);

        res.json({success: true, message: 'User registered successfully', token});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: 'Error registering user', error});
    }
}


// Admin
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            res.json({success: true, message: "Admin logged in successfully", token});
        }else{
            res.json({success: false, message: "Invalid credentials"});
        }
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error logging in admin", error});
    }
}




export {loginUser, registerUser, adminLogin};
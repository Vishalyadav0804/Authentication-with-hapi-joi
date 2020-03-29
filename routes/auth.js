const router = require('express').Router();
const User = require('../model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const {registerValidation,loginValidation}=require('../validation');

require("dotenv").config();

router.post('/register',async(req,res)=>{
    //LETS VALIDATE THE DATA BEFORE WE ADD A USER
    //const {error,value}=schema.validate(req.body);
    const {error}=registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the user is already in the database
    const emailExist=await User.findOne({email:req.body.email});
    if(emailExist) return res.status(400).send('Email already exits')

    //Hash Password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(req.body.password,salt);

    //Create new user
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:hashedPassword
    });
    try{
        const savedUser=await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});


//Login
router.post('/login',async(req,res)=>{

    //Validate the user before login
    const {error}=loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking if the email exists
    const user=await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Email not exists');

    //Checking if password is correct or not
    const validPass =await bcrypt.compare(req.body.password,user.password);
    if(!validPass) return res.status(400).send('Password invalid');

    //Create and assign a token
    try{
        const token =jwt.sign({_id:user._id}, process.env.TOKEN_SECRET);
        res.header('auth-token',token).send(token);
    }
    catch{
        res.status(400).send('Token error');
    }
    //res.send('Logged in');
});

module.exports=router;

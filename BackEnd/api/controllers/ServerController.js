
const mongoose=require('mongoose')
const Regmod=require('../model/RegisterSchema')


const path = require('path')
const cors = require('cors')
const bcrypt=require('bcrypt')

const dotenv=require('dotenv')
dotenv.config()

const express=require('express')
const app=express()

app.use(cors());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "..", "FrontEnd", "public")));


app.post('/Register',async(req,res)=>{
    try{
        console.log("Incoming data:", req.body);
        const {username,password,email,phone,image}=req.body 

        if(await Regmod.findOne({username})!=null)
        {
            console.log("Username Already Exists !")
            res.status(400).json({message:'Username Already Taken !',redirect:'/Register'})
            
        }
        else 
        {
            console.log("Data:",username,password,email,phone,image)
            const hashedPassword=await bcrypt.hash(password,10)
            const newUser=new Regmod({username,password:hashedPassword,email,phone,image})
            await newUser.save()
            res.status(200).json({message: "User Registered Successfully !",redirect :'/HomePage'})
        }
    }
    catch(error)
    {
        console.error("Error during registration:", error);
        console.log("Something Went Wrong with POST Request")
        res.status(500).json({message:"User Registration Failed !"})
    }
})


app.get('/Register',async(req,res)=>{
    res.send('Register Page Requested !')
})

module.exports=app
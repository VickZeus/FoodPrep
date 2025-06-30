
const mongoose=require('mongoose')
const Regmod=require('../model/RegisterSchema')
const Logmod=require('../model/LoginSchema')


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




app.post('/Login',async(req,res)=>{
    console.log('Entered Data : ',req.body)
    const {username,password}=req.body
    const ans=await Regmod.findOne({username:username.trim().toLowerCase()})
    console.log('SMaller USer : ',username.trim().toLowerCase())
    console.log('DBData : ',ans)

    if(username===process.env.ad_user && password===process.env.ad_pass )
    {
        return res.status(200).json({message: 'Administrator Login Successfull',redirect:'/Admin'})
    }

    if(username==null)
    {
        return res.status(400).json({message:'Username is null',redirect:'/Login' })
    }
    if(password==null)
    {
        return res.status(400).json({message:'Password is null',redirect:'/Login' })
    }

    if(ans===null)
    {
        return res.status(400).json({message:'No User Found',redirect:'/Login' })
    }

    const isMatch=await bcrypt.compare(password,ans.password)
    if(isMatch)
    {
        LogHistory(req,'Success')
        return res.status(200).json({message: ' Login Successfull',redirect:'/HomePage',user:{
            username:ans.username,
            email: ans.email,
            phone: ans.phone,
            image: ans.image
        }})
    }
    else 
    {
        LogHistory(req,'Failure')
        return res.status(400).json({message: 'Invalid Password',redirect:'/Login'})
    }
})

async function LogHistory(req,status)
{
    try 
    {
        const {username}=req.body
        console.log(username,status)
        const newUser=new Logmod({username,status})
        await newUser.save()
    }
    catch(error)
    {
        console.log('Login History Updated',error)
    }
}





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
            res.status(200).json({message: "User Registered Successfully !",redirect :'/Login'})
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
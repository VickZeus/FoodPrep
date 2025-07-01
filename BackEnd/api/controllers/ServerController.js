
const mongoose=require('mongoose')
const Regmod=require('../model/RegisterSchema')
const Logmod=require('../model/LoginSchema')
const Itemmod=require('../model/ItemSchema')

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



app.delete('/Drop/:name', async (req, res) => {
    const itemName = req.params.name.trim().toLowerCase()
    try {
        const deletedItem = await Itemmod.findOneAndDelete({ name: itemName })

        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' })
        }
        res.json({ message: 'Item deleted successfully', item: deletedItem })
    } catch (err) {
        console.error('Error deleting item:', err);
        res.status(500).json({ message: 'Server error while deleting item' })
    }
});


app.put('/Inventory/:name', async (req, res) => {
    const name = req.params.name.trim().toLowerCase();
    const updatedData = req.body;

    try {
        const updated = await Itemmod.findOneAndUpdate(
            { name },
            updatedData,
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.json(updated);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/Add',async(req,res)=>{
    try{
        console.log("Incoming data:", req.body);
        let {name,image,discount,quantity,price}=req.body 
        name=name.trim().toLowerCase()
        if(await Itemmod.findOne({name})!=null)
        {
            console.log("Itemname Already Exists !")
            res.status(400).json({message:'Itemname Already Taken !',redirect:'/Add'})
        }
        else 
        {
            console.log("Data:",name,image,discount,quantity,price)
            const newUser=new Itemmod({name,image,discount,quantity,price})
            await newUser.save()
            res.status(200).json({message: "Item Added Successfully !",redirect :'/Inventory'})
        }
    }
    catch(error)
    {
        console.error("Error during Item Addition:", error);
        console.log("Something Went Wrong with POST Request")
        res.status(500).json({message:"Item Addition Failed !"})
    }
})



app.get('/Inventory',async(req,res)=>{
    const name = req.query.name?.trim().toLowerCase();
    if (!name) return res.status(400).json({ error: 'Name missing' });
    const item = await Itemmod.findOne({ name: name });
    if (!item) return res.status(404).json({ error: 'Not found' });

    res.json(item);
})

app.post('/Login',async(req,res)=>{
    console.log('Entered Data : ',req.body)
    const {username,password}=req.body
    const ans=await Regmod.findOne({username:username.trim().toLowerCase()})
    console.log('SMaller USer : ',username.trim().toLowerCase())
    console.log('DBData : ',ans)

    if(username===process.env.ad_user && password===process.env.ad_pass )
    {
        return res.status(200).json({message: 'Administrator Login Successfull',redirect:'/Inventory'})
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


app.get('/HomePage',async(req,res)=>{
    try {
        const items = await Itemmod.aggregate([{ $sample: { size: 10 } }]); // random 10
        res.json(items);
    } catch (err) {
        console.error("Error fetching random items:", err);
        res.status(500).json({ message: "Server error" });
    }
})

app.get('/HomePage', async (req, res) => {
    const nameQuery = req.query.name?.trim().toLowerCase();

    try {
        if (nameQuery) {
            const items = await Itemmod.find({
                name: { $regex: nameQuery, $options: 'i' }
            });

            if (items.length === 0) {
                return res.status(404).json({ message: 'No items found' });
            }

            return res.json(items);
        }

        const randomItems = await Itemmod.aggregate([{ $sample: { size: 10 } }]);
        res.json(randomItems);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});





module.exports=app
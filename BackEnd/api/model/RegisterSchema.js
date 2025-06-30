const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    username: {
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },

    password:{
        type:String,
        required:true
    },
    
    email:{
        type:String, 
        required:true
    },
    
    phone:{
        type:String,
        required:true
    },
    
    image:{
        type:String,
        required:true
    }
},
    {
        timestamps:true
    })

const Regmod=mongoose.model('Registration_Details',schema)
module.exports=Regmod 

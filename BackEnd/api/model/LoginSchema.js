const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    Username:{
        type:String,
        required:true
    },

    Password:{
        type:String,
        required:true
    }
})
const Logmod=mongoose.model('Login_History',schema)
module.exports=Logmod
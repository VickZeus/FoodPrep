const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        lowercase:true
    },

    status:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const Logmod=mongoose.model('Login_History',schema)
module.exports=Logmod
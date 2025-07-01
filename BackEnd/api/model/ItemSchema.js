const mongoose=require('mongoose')
const schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    quantity:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },

    price:{
        type:String,
        required:true
    },

    discount:{
        type:String,
        required:true
    }
},{
    timestamps:true
})
const Itemmod=mongoose.model('Item_Summary',schema)
module.exports=Itemmod
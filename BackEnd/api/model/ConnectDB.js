const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

async function ConnectDB()
{
    try 
    {
        await mongoose.connect(process.env.url)
    }
    catch(error)
    {
        console.log("Database Connected !!")
        return false;
    }
    console.log("Database Connected !!")
    return true;
}

module.exports=ConnectDB

const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config()

async function ConnectDB()
{
    try 
    {
        await mongoose.connect(process.env.URL)
    }
    catch(error)
    {
        console.log("Database Connection Failed!!")
        return false;
    }
    console.log("Database Connected !!")
    return true;
}

module.exports=ConnectDB

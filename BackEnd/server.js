const connectDB=require('./api/model/ConnectDB')
const app=require('./api/controllers/ServerController')

const dotenv=require('dotenv')
dotenv.config()

async function startServer()
{
    const flag=await connectDB();
    if(flag)
    {
        app.listen(process.env.PORT||3500,()=>{
            console.log('Server is listening to port ',process.env.port||3500)
        })  
    }
    else{
        console.log('Database Connection Failed !! Cannot start server')
    }
}


startServer()
const express=require('express');
const connect=require('./config/db');
const userController=require('./controllers/user.controller')
const galleryController=require('./controllers/gallery.controller')
const app=express();
app.use('/user',userController)
app.use('/gallery',galleryController)
app.use(express.json());
const start=async()=>{
    await connect();
    app.listen(3333,()=>{
        console.log("server is live in 3333")
    })
}
module.exports=start;
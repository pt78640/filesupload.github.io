const mongoose=require('mongoose');
const start=()=>{
    return mongoose.connect(' mongodb://127.0.0.1:27017/file');
}
module.exports=start;

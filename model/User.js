const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name: {
        type:String,
        min:6,
        max:255,
        required:true
    },
    email: {
        type:String,
        max:255,
        required:true,
        min:6
    },
    password: {
        type:String,
        required:true,
        max:1024,
        min:6
    },
    date: {
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model('User',userSchema);
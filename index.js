const express=require('express');
const app=express();
//const dotenv=require('dotenv')
const mongoose=require('mongoose');
const MongoClient = require('mongodb').MongoClient;
//Import Routes
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');

//.env file is created to hide our database password
//dotenv.config();

//Connect to database
mongoose.connect('mongodb+srv://Vishalyadav0804:Vishal@0804@test-cluster-kkm8h.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true },()=>console.log('DB connected'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Route middleware
app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);

app.listen(3000,()=>{
    console.log('Server up and running')
});
const express=require('express');
const cors =require('cors');
const path=require('path');
const mongoose=require('mongoose');
const db=require('./config/db').mongoURI;
const app=express();
const PORT=process.env.PORT||5000;

//connect mongodb
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log('mongodb connected'))
.catch((err)=>console.log(err));

//static 
app.use(express.static(path.join(__dirname,'public')));

//express middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//enabling cors
app.use(cors());

//routes
app.use('/poll',require('./route/poll'));


app.listen(PORT,()=>console.log(`server started on port ${PORT}`));

const express = require('express')
const cors = require('cors');



const app = new express();

// fetching images from the upload directory
app.use('/uploads', express.static('uploads'));



app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors());

const cuisineRouter = require('./Routes/Reciperoutes')
app.use('/',cuisineRouter);

app.listen(3016,()=>{
    console.log("App is running on port 3016");
});
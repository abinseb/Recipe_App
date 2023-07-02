const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://abinseb09:abinseb09@cluster0.2xp4bal.mongodb.net/CuisineDB?retryWrites=true&w=majority")
.then(()=>{
    console.log("Database Connected");
})
.catch(err=>console.log(err))

let CSchema = mongoose.Schema;


const cuisineSchema = new CSchema({
    cuisineName:String,
    cuisineType:String,
    durationOfCooking:Number,
    numberOfServings:Number,
    image:String
});
var cuisineModel = mongoose.model("cuisine",cuisineSchema);
module.exports = cuisineModel;
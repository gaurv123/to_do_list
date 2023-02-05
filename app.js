require('dotenv').config()
const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const app=express();
const mongoose=require("mongoose")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('public'))
mongoose.connect("mongodb+srv://thakurgaurav273:GAURav123@cluster0.lsk3yr9.mongodb.net/TO_DO_LIST")
var day="";
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const Wakeup=new Item({
    name:"Wake Up"
})
const FreshUp=new Item({
    name:"Fresh"
})
const Shower=new Item({
    name:"Take Shower"
})
const default_arr=[Wakeup,FreshUp,Shower];

app.set('view engine','ejs');
app.get("/",function(req,res){
    day=new Date().toDateString();
   
    Item.find({},function(err,founditems){
        if(founditems.length===0){
            Item.insertMany(default_arr,function(err){
                if(err)console.log(err);
                else console.log("Success");
            })
            res.redirect("/")
        }
        else{
            res.render("index",{my_item:founditems,today:day})
        }
       
    })
   
})
app.post("/",function(req,res){
    var itemName=req.body.item;
    var item=new Item({
        name:itemName
    })
    item.save();
    res.redirect("/")
})
app.post("/delete",function(req,res){
  
   Item.findByIdAndDelete(req.body.checkbox,function(err){
    if(err) console.log(err);
    else console.log("Successfull deletion");
   })
    res.redirect("/")
})
app.get("/work",function(req,res){

    res.render("index",{my_item:works,today:"Work_List"})
})

app.listen(3000,function(req,res){
    console.log("Server is up");
})

const express = require('express');
const app = express(); 
const hbs = require("hbs");
const path = require("path");
const res = require('express/lib/response');


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

app.set('view engine','hbs');
const css_path = path.join(__dirname,'/public');
app.use(express.static(css_path));

hbs.registerPartials(__dirname+'/views', '{{footer}}')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
//end


const user = require("./schema")
require("./db")


app.get("/",(req,res)=>{
    res.render('index'); 
})

app.get("/rooms",(req,res)=>{
    res.render('rooms'); 
})

app.get("/contact",(req,res)=>{
    res.render('contact'); 
})

app.get("/login",(req,res)=>{
    res.render('login'); 
})

app.get("/booking",(req,res)=>{
    res.render('booking'); 
})

app.get("/payment",(req,res)=>{
    res.render('payment'); 
})

app.post("/register", async(req,res)=>{

    try {

        var createddata = new user(req.body);

        createddata.save();

        console.log("USER REGISTERED");
        res.redirect("/rooms");

    } catch (error) {
        console.log(error);
        res.redirect("login");
    }
})



app.listen("3000",()=> {
    console.log("server connected");
})







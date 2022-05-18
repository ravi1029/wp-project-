
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
    res.render('Main'); 
})

app.get("/Products",(req,res)=>{
    res.render('Products'); 
})

app.get("/Main",(req,res)=>{
    res.render('Main'); 
})

app.get("/Login1",(req,res)=>{
    res.render('Login1'); 
})
app.get("/forgot",(req,res)=>{
    res.render('forgot'); 
})
app.get("/cart",(req,res)=>{
    res.render('cart.html'); 
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







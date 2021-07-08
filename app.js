//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const mongoose = require("mongoose");

mongoose.pluralize(null);

mongoose.connect("mongodb+srv://admin-mihir:spear123@cluster0.knn8o.mongodb.net/blogDatabase", { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

const blogSchema = new mongoose.Schema({
  title: String,
  content: String
});

const blog = mongoose.model("blog", blogSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

let postArray = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
  blog.find({},(err,foundBlogItems)=>{
    if(err){
      console.log(err);
    }
    else{
      if(!foundBlogItems){
        res.render("home", {homeStartingContent: homeStartingContent, postArray: []});
      }
      else{
        res.render("home", {homeStartingContent: homeStartingContent, postArray: foundBlogItems});
      }
    }
  });
});

app.get("/about", function(req,res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});

app.get("/posts/:id", function(req,res){
  console.log(req.params.id);
    blog.findOne({_id: req.params.id},(err,foundBlogItems)=>{
      if(err){
        console.log(err);
      }
      else{
            res.render("post", {title: foundBlogItems.title, content: foundBlogItems.content});
        // res.send("Sorry post not found");
        // console.log("hello");
      }
    });
});



app.post("/compose", function(req,res){

    // let post = {
    //     title: req.body.postTitle,
    //     content: req.body.postBody
    // }
    const blogItem = new blog({
      title: req.body.postTitle,
      content: req.body.postBody
    });
    blogItem.save(err =>{
      if(err){
        console.log(err);
      }
      else{
        res.redirect("/");
      }
    });
    // postArray.push(post);
});

app.listen(3000, function() {
  console.log("Server started successfully");
});

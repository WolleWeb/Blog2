//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));


main().catch(err => console.log(err));
async function main(){
 await mongoose.connect("mongodb+srv://veroxlive1:Pokemoner132@cluster0.un9cv7e.mongodb.net/postsDB");
 console.log("Connected to Database");

};

const postSchema = new mongoose.Schema({
  title: String,
  text: String
});
const post = mongoose.model("post", postSchema);
let posts = [];


app.get("/", function(req, res){
  
  renderPosts().catch(err => console.log(err));

  async function renderPosts(){

    post.find()
    .then(posts =>{
      res.render("home.ejs", {StartingContent: homeStartingContent, posts: posts});
    });
    console.log("Succesfulle rendered new Post");


  };

});

app.get("/about", function(req, res){
  res.render("about.ejs", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact.ejs", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose.ejs");
});

app.post("/compose", function(req, res){


  

  const titledyn = req.body.newTitle;
  const textdyn = req.body.newText;

  saveDynToDB().catch(err => console.log(err));

  async function saveDynToDB(){
  let dynamicpost = new post({
    title: titledyn,
    text: textdyn
  });

  await dynamicpost.save().then(()=>{
    console.log("Post inside dynamicpost addes Succesfulley");
    res.redirect("/");
  })

};
  

});

app.get("/posts/:postID", function(req, res){

  var requestedPostId = req.params.postID;

  var postName =_.lowerCase(req.params.postName);

  post.findOne({_id:requestedPostId})
  .then(foundPost =>{
    res.render("post",{
      storedTitle: foundPost.title,
      storedText: foundPost.text
    })
  })


  posts.forEach(function(post){

    let storedTitle = post.newTitle;
    let storedText = post.text;
    if(storedTitle = postName){
      res.render("post.ejs", {storedTitle: storedTitle, storedText: storedText});
    };
  });

});











app.listen(3000, function() {
  console.log("Server started on port 3000");
});

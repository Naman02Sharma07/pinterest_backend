var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel  = require("./post")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/createuser',async function(req,res){
  let user = await userModel.create({
    username:"Naman" ,
    password: "Sharma",
    posts: [],//when we create a route for out post what happens that it get the is in it 
    email: "ns@gmail.com",
    fullname:"NamaN Sharma"
  })
  res.send(user);
})

router.get('/createpost',async function(req,res){
  let createpost = await postModel.create({
  postText: "Hello everyone",
  })

  res.send(createpost);
})




module.exports = router;

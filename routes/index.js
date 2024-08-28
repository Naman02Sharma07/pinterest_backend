var express = require('express');




const userModel = require("./users");
const postModel  = require("./post");
const passport = require("passport");
const upload = require('./multer');

const localStrategy = require("passport-local");//this is used to authenticate the user based on the username and the password 
passport.use(new localStrategy(userModel.authenticate()));//this mean s for suthentication we follow this trategy 

var router = express.Router();
// const users = require('./users');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res) {
  // console.log(req.flash('error'));//this is to use to show whether there is any error we get or not
  res.render("login",{error:req.flash('error')});//here error is the array
});

router.get('/feed', function(req, res) {
  res.render("feed");
});





router.get("/profile",isLoggedIn,async function(req,res,next){
  const user = await userModel.findOne({
    username:req.session.passport.user
  })
  .populate("posts")
  console.log(user);
  res.render("profile",{user});
})

router.post("/register",function(req,res,next){
  let userData = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname
  })

  userModel.register(userData, req.body.password).then(function(){
    passport.authenticate("local")(req,res,function(){
      res.redirect("/profile");
    })
  })
})




router.post("/login",passport.authenticate("local",{
  successRedirect:"profile",//if login successful then redirect to the profile page 
  failureRedirect:"/login",//else it redirect the home page again
  failureFlash : true//here it means if our login fails the the failure flash value would be true and we get an error
}),function(req,res){})


router.get("/logout",function(req,res){
  req.logOut(function(err){
    if(err){
      return next(err);
    }
    res.redirect("/");
  })
})

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()) return next();
  res.redirect("/");
}


router.post('/upload',isLoggedIn,upload.single("file"),async function(req,res,next){
  // console.log(req.body);
  if(!req.body.file){
    return res.status(400).send("no file were uploaded");
  }
  const user = await userModel.findOne({
    username: req.session.passport.user
  })
  console.log(user);
  const post = postModel.create({
    image: req.body.file.filename,
    ImageText:req.body.filecaption,
    user: user._id
  })
  console.log(post);

  user.posts.push(post._id);
  res.send("done");
})




// router.get('/createuser',async function(req,res){
//   let user = await userModel.create({
//     username:"Namfan" ,
//     password: "Sharfma",
//     posts: [],//when we create a route for out post what happens that it get the is in it 
//     email: "nsf@gmail.com",
//     fullname:"NamafN Sharma"
//   })
//   res.send(user);
// })

// router.get('/createpost',async function(req,res){
//   let createdpost = await postModel.create({
//   postText: "aur bhai log kya hal chal",
//   user: "66bc13fd5578a2f37f74c652"//this is the id of the user 
//   });

//   let user = await userModel.findOne({
//     _id: "66bc13fd5578a2f37f74c652"})//we are finding the user by this userid 
//     user.posts.push(createdpost._id);//in the userModel we push this id
//     await user.save();//here we save the data
//     // res.send("done");//this is what we print 
//     res.send(createdpost);
// })


// router.get("/alluserposts",async function(req,res,next){
//   let userposts = await userModel.findOne({_id:"66bc13fd5578a2f37f74c652"}).populate("posts");//now here we get all th posts of the user who having this id 
//   //.populate will populate the posts data in the browser 
//   res.send(userposts);
// })




module.exports = router;

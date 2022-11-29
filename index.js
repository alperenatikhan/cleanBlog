const express= require('express');
const app = express();
const ejs= require('ejs');
require('dotenv').config();
const Post = require('./models/Post');
const mongoose = require('mongoose')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())


const port= 3000

console.log(`${process.env.CONNECTION_STRING}`)



mongoose.connect(`${process.env.CONNECTION_STRING}/cleanblog-test-db`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>console.log('connected to db'))
.catch(()=> console.log('connection failed to db'));


app.get('/', async(req,res) =>{

  let allPosts= await Post.find({})
  
  allPosts = allPosts.sort((a,b) => b.dateCreated-a.dateCreated )

 res.render('index', {allPosts})

})

app.get('/about', (req,res) =>{

    res.render('about')
   
   })

app.get('/addphoto', (req,res) =>{

    res.render('addphoto')
   
   })

   app.get('/video-page', (req,res) =>{

    res.render('video-page')
   
   })

   app.post('/addnewblog', (req,res) =>{



   Post.create(req.body).then(()=>res.redirect('/'))
 

   }
   )

app.listen(port, ()=> console.log(`it started ${port}`))
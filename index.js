const express= require('express');

const app = express();
const ejs= require('ejs');

const Post = require('./models/Post');
const mongoose = require('mongoose')
const multer  = require('multer')
const upload = multer({ dest: 'tmp/' })


const path=require('path');
const photoController = require('./controllers/photoController')
const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name : process.env.CLOUDINARY_cloud_name,
  api_key: process.env.CLOUDINARY_api_key,
  api_secret: process.env.CLOUDINARY_api_secret
});


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


app.get('/', photoController.getAllPhotos)

app.get('/about',photoController.getAboutPage)

app.get('/addphoto', photoController.getAddPhotoPage)

app.get('/video-page', photoController.getVideoPage)

app.get('/photos/:photoid', photoController.getPhotoDetailPage)

app.get('/update/:photoid', photoController.getUpdatePage)

app.post('/update_one_photo/:photoid',photoController.postUpdate)

app.get('/delete/:photoid', photoController.deletePhoto) 

app.post('/addnewblog',upload.single("photo"),photoController.postPhoto)

app.listen(port, ()=> console.log(`it started ${port}`))
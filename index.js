const express= require('express');
const fileUpload = require('express-fileupload');
const app = express();
const ejs= require('ejs');

const Post = require('./models/Post');
const mongoose = require('mongoose')


const path=require('path');
const photoController = require('./controllers/photoController')
const cloudinary = require('cloudinary').v2;



cloudinary.config({
  cloud_name: "dyfb2u96d",
  api_key: "865824418564613",
  api_secret: "h7x0kGaogxBCg-OHgF6Iq3Xasow"
});


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(fileUpload({

useTempFiles: true


}))



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

app.post('/addnewblog',photoController.postPhoto)

app.listen(port, ()=> console.log(`it started ${port}`))
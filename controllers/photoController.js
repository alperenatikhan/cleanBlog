const Post = require('../models/Post');
const cloudinary = require('cloudinary').v2;
const fileUpload = require('express-fileupload');
require('dotenv').config();


cloudinary.config({
  cloud_name : process.env.CLOUDINARY_cloud_name,
  api_key: process.env.CLOUDINARY_api_key,
  api_secret: process.env.CLOUDINARY_api_secret
});






exports.getAllPhotos = async(req,res) =>{

  let allPosts= await Post.find({})
  
  allPosts = allPosts.sort((a,b) => b.dateCreated-a.dateCreated )

 res.render('index', {allPosts})

}


exports.getAboutPage = (req,res) =>{

    res.render('about')
   
   }


exports.getAddPhotoPage = (req,res) =>{

    res.render('addphoto')
   
   }

exports.getVideoPage = (req,res) =>{

    res.render('video-page')
   
   }

exports.getPhotoDetailPage = async(req,res)=>{

    let pageId= req.params.photoid
    let postData = await Post.findById(pageId).then(item => item?._doc).then(item=> res.render('new_photo' ,{"photoData" : [{...item}]}))
    

  }

exports.getUpdatePage = async(req,res) => {
  let pageId= req.params.photoid
  let updateData = await Post.findById(pageId).then(item => item?._doc).then(item=> res.render('update_photo',{"photoData" : [{...item}]}))


}

exports.postUpdate =  async(req,res)=>{
  let pageId= req.params.photoid
  let photoData= req.body
  
  Post.findByIdAndUpdate( pageId, {...photoData} ).then(()=>res.redirect('/'))
}

exports.deletePhoto = async(req,res) => {

let pageId= req.params.photoid

let foundFileName = await Post.findById(pageId).then(item=> item._id)
let uploadPath = await '/public/photos/' + foundFileName;

let cloudinaryDelete = await cloudinary.uploader.destroy(`images/${foundFileName}`).then(()=> console.log('deleted from cloudinary ')). catch(()=>console.log("file not found"));

  Post.findByIdAndDelete(pageId)


.then(()=>res.redirect('/'))

}

exports.postPhoto =async(req,res) =>{

    let sampleFile;
    let uploadPath; 
    let fileUrl;
    
    const metadata = {
      contentType: 'image/jpeg'
    };
    

async function uploadPhotoFile(){

  

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
 sampleFile = req.files.photo;
  uploadPath = __dirname + '/public/photos/' + sampleFile.name;
  let fileName = sampleFile.name

//Cloudinary functions
const res = await cloudinary.uploader.upload( sampleFile.tempFilePath , {public_id: fileName, resourceType:"auto", folder:'images'}).then((data) => {
  console.log(data);
  fileUrl =data.secure_url;
}).catch((err) => {
  console.log(err);
}

)
}
    

await uploadPhotoFile()

Post.create({...req.body,"fileName": sampleFile.name, "fileUrl": fileUrl  }).then(()=> res.redirect("/"))
 
}


   
 


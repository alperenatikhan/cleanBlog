const express= require('express');
const app = express()
const ejs= require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))

const port= 3000

app.get('/', (req,res) =>{

 res.render('index')

})

app.get('/about', (req,res) =>{

    res.render('about')
   
   })

app.get('/contact', (req,res) =>{

    res.render('contact')
   
   })

   app.get('/video-page', (req,res) =>{

    res.render('video-page')
   
   })

app.listen(port, ()=> console.log(`it started ${port}`))
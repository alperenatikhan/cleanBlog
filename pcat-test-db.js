const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://alp:alpalp@cluster0.bjbdj.mongodb.net/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>console.log('connected')).catch(()=> console.log('connection failed'));

const PhotoSchema = new Schema({
    title: String,
    description: String,
  })

  const Photo = mongoose.model('Photos', PhotoSchema);

  Photo.create({
    title: 'Photo Title 3',
    description: 'Finally started recording',
  }).then(()=>console.log('finished')).catch(()=> console.log('failed'))
  
  
  
  Photo.find({}, (err, data) => {
    console.log(data);
  });

  Photo.deleteMany({title: 'Photo Title 3'}, (err) => console.log(err))
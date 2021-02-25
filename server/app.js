const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('./cvData');

const port = 3000; //Port number where server listens on

app.use(bodyParser.json())

//URI for connecting to MongoDb Atlas Cloud
const mongoURI = 'mongodb+srv://faizancv:WOFE1bFpUahpj6b9@cluster0.4egi3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

//Initializing Mongoose Schema to Cv
const Cv = mongoose.model('cv');

//Connect to database
mongoose.connect(mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log('connected to mongodb');
})

mongoose.connection.on('error', ()=>{
    console.log('error connecting to mongodb');
})

//Default Route
app.get('/',(req,res)=>{
    Cv.find({}).then(data=>{
        res.send(data)
    }).catch(error=>console.log(error))
})

//Post route to add data in database
app.post('/post',(req,res)=>{
    const cv = Cv({
        title: req.body.title,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        info: req.body.info,
        education: req.body.education,
        experience: req.body.experience,
        projects: req.body.projects
    })
    cv.save()
     .then(data=>
        {console.log(data)
        res.send(data)
     }).catch(error=>console.log(error))
    
})

//Delete route to delete data from database
app.post('/delete',(req,res)=>{
    Cv.findByIdAndRemove(req.body.id)
    .then(data=>{console.log(data)
        res.send(data)
       }).catch(error=>console.log(error))
})

//Server listening on port 3000
app.listen(port, ()=>{
    console.log('server running');
})



const bodyParser = require('body-parser');
let express = require('express');
let path = require('path')
let app = express();

let funct = require('./functions/functions')
let funct2 = require('./functions/functions2')

app.use(bodyParser.urlencoded({extended:false}))

app.post('/signup',(req,res)=>{
    funct.insertuser(req,res)
})

app.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/signup.html'))
})

app.post('/insertmovie',(req,res)=>{
    funct.insertmovie(req,res)
})

app.get('/insertmovie',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/insertmovie.html'))
})

app.post('/insertrating',(req,res)=>{
    funct2.insertrating(req,res)
})

app.get('/insertrating',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/insertrating.html'))
})

app.post('/insertshow',(req,res)=>{
    funct.insertshow(req,res)
})

app.get('/insertshow',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/insertshows.html'))
})

app.post('/searchshow',(req,res)=>{
    funct.searchshow(req,res)
})

app.get('/searchshow',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/searchshows.html'))
})

app.post('/searchrating',(req,res)=>{
    funct2.searchrating(req,res)
})

app.get('/searchrating',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/searchrating.html'))
})


app.get('*',(req,res)=>{
    res.send("hello world")
})

const server = app.listen(8000,()=>{
    console.log("Server running in "+server.address().port)
    }
)
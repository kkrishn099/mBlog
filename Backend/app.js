const express = require('express');
const bodyparser = require('body-parser');

const app = express();

post =[
    {title:"my First Post Title",content:"my post content"},
    {title:"my Second Post Title",content:"my post content"},
    {title:"my Third Post Title",content:"my post content"}
]
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,Content-Type,X-Requested-With, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,OPTIONS,DELETE");
    next();
})
app.post('/api/posts',(req,res,next)=>{

    const post =req.body;
    console.log(post) ;
    res.status(201).json( {message:'post added Sucessful'});
  


})

app.get('/api/posts',(req,res,next)=>{
    res.status(200).json({message :"Post Fetch Successfully",posts :post});
    
});



module.exports =app;
const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./post/model')

const app = express();
//6kjZ3tQJB0oTZrJ8
post =[];
mongoose.connect("mongodb+srv://krishna:6kjZ3tQJB0oTZrJ8@cluster0-4flf5.mongodb.net/node-angular?retryWrites=true&w=majority",{ useNewUrlParser: true }).then(()=>{
    console.log("DataBase Connected..")
}).catch((err)=>{
    console.log(err)
})
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,Content-Type,X-Requested-With, Accept");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS, DELETE");
    next();
})
app.post('/api/posts',(req,res,next)=>{

    const post = Post({
        title :req.body.title,
        content:req.body.content
    })
    post.save().then(createdPost=>{
        const id = createdPost._id;
        res.status(201).json( {message:'post added Sucessful',postId:id});  
    });
    console.log(post) ;
    
  


})
app.delete('/api/posts/:id',(req,res,next)=>{
    Post.deleteOne({_id:req.params.id}).then((result)=>{
        console.log(result);
        res.status(200).json({message:"Deleted Succefully"})
    });
    
})

app.get('/api/posts',(req,res,next)=>{
     Post.find().then((documents=>{
        res.status(200).json({message :"Post Fetch Successfully",posts :documents});
 
         
     }))
  
      
});





module.exports =app;
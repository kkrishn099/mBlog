import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

import {HttpClient, } from '@angular/common/http'

import {Post} from './post.model'
import { Subject } from 'rxjs';


@Injectable({providedIn :'root'})
export class PostService{


  constructor(private http :HttpClient){

  }
   private posts:Post[]=[];

   private updatedPost = new Subject();


   getPost(){
    this.http.get<{message:string , posts:any}>("http://localhost:3000/api/posts").
    pipe(map((postData)=>{
      return postData.posts.map((post)=>{
      return {
        title:post.title,
        content:post.content,
        id:post._id

      }})
    })).
    subscribe((transFormPost )=>{
      this.posts =transFormPost;

      this.updatedPost.next([...this.posts]);

    });
    
   

   }
   deletePost(postId :string){

    this.http.delete("http://localhost:3000/api/posts/" +postId).subscribe(()=>{
      console.log("Deleted post!!")
      const postupdated = this.posts.filter(post=>post.id!=postId);
      this.posts = postupdated;
      this.updatedPost.next([...this.posts]);
    })
  }

   getupdatePostListner(){
     return  this.updatedPost.asObservable();
   }

   addPost(title :string ,content:string){

    const post = {
        id:null,
        title :title,
        content:content
    }
    this.http.post<{message:string,postId:string}>("http://localhost:3000/api/posts",post).
    subscribe(responsedata=>{
      const id=responsedata.postId;
       post.id =id;
      
      this.posts.push(post);
      this.updatedPost.next([...this.posts])
  
    })
  
   }
   
    
   



}
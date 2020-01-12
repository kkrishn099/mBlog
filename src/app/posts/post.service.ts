import { Injectable } from '@angular/core';

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
    this.http.get<{message:string , posts:Post[]}>("http://localhost:3000/api/posts").
    subscribe((postData  )=>{
      this.posts =postData.posts;

      this.updatedPost.next([...this.posts]);

    });
   

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
    this.http.post<{message:string}>("http://localhost:3000/api/posts",post).
    subscribe(responseMessage=>{
      console.log(responseMessage.message);
      this.posts.push(post);
      this.updatedPost.next([...this.posts])
  
    })
      
    

  
   }



}
import { Component } from '@angular/core';
import {Post} from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../post.service';


@Component({
    selector : 'app-post-create',
    templateUrl : './create-post.component.html',
    styleUrls :['./create-post.component.css']
})
export class PostComponentComponent{

    
      constructor(public postService:PostService){}
    onAddPost(form :NgForm){
       if(form.invalid){
           return;
       }
       
       this.postService.addPost(form.value.title,form.value.content);
       form.onReset(); 
          
    }

}
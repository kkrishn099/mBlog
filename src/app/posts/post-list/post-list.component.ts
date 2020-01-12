import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import {Subscription} from 'rxjs';

@Component({
    selector:'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit ,OnDestroy{

    posts:Post[] =[]

    postSub = new Subscription();

     constructor(public postService :PostService ){}

    ngOnInit(){
       this.postService.getPost();
     this.postSub=  this.postService.getupdatePostListner().subscribe((post :Post[] ) =>{
           this.posts = post;
       })
    } 
     
    ngOnDestroy(){
        this.postSub.unsubscribe();
    }

}
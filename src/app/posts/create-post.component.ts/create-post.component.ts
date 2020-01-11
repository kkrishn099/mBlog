import { Component ,EventEmitter ,Output } from '@angular/core';

@Component({
    selector : 'app-post-create',
    templateUrl : './create-post.component.html',
    styleUrls :['./create-post.component.css']
})
export class PostComponentComponent{

    enteredTitle ="";
    enteredContent ="";
     @Output() postCreated = new EventEmitter();

    onAddPost(){
        const post ={
            title:this.enteredTitle,
            content:this.enteredContent
        }
       this.postCreated.emit(post);
    
    }

}
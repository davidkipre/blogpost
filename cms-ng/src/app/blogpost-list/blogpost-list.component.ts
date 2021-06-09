import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { BlogpostService } from '../blogpost.service';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {

  //blogPostList$ est une variable il recupere le Blogpost qu'on a créé blogpost.ts on a recupéré dans le getBlogposts(): Observable<Blogpost[]>
  blogPostList$: Observable<Blogpost[]>;
  
  imagePath = environment.imagePath; //permet a l'image enregistré dans le server de s'afficher
  
  imagesFolder = 'http://localhost:3000/'; //gere l'image

  //methode par accesseur pour recuperer un type directement dans la racine blogpostService le nom qu'on donne et on recupere cela dans export class BlogpostService
  constructor(private blogpostService: BlogpostService) { }

  ngOnInit(): void {
    this.blogPostList$ = this.blogpostService.getBlogposts();
  }

}

import { Component, OnInit } from '@angular/core';
import { Blogpost } from '../models/blogpost';
import { BlogpostService } from '../blogpost.service';
import { Observable } from 'rxjs';
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  allBlogposts: Blogpost[];
  blogposts$: Observable<Blogpost[]>;
  errorFromServer = '';

  constructor(private blogpostService: BlogpostService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    if(!this.authService.isAuthenticated) {
      this.router.navigate(['/auth']);
    };
  //ce cote en bas est pareil que lui juste en bas de lui
    //this.blogposts$ = this.blogpostService.getBlogposts();
    this.blogpostService
      .getBlogposts()
      .subscribe(data => this.refresh(data));

      this.blogpostService
      .handleBlogpostCreated()
      .subscribe(data => {
        console.log('AdminComponent received', data);
        this.refresh(data);
      });

  }
//supprime le ou les blogposts selectionnés
  deleteBlogposts(selectedOptions) {
    const ids = selectedOptions.map(so => so.value);
    if (ids.length === 1) {
      return this.blogpostService
        .deleteSingleBlogpost(ids[0])
        .subscribe(data => this.refresh(data), err => this.handleError(err));
    } else {
      return this.blogpostService
        .deleteBlogposts(ids)
        .subscribe(data => this.refresh(data), err => this.handleError(err));
    }
  }
//rafraichit apres chaque action de suppression
  refresh(data) {
    console.log('data', data);
    this.blogpostService.getBlogposts().subscribe(data => {
      this.allBlogposts = data;
    });
  }

  handleError(error) {
    if(error.status === 401) {
      this.router.navigate(['/auth']);
    } else {
      this.errorFromServer = `Error ${error.status} - ${error.statusText}`;
    }
  }

  logout() {
    this.authService
      .logout()
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/auth'])
      }, err => console.error(err))
  }

}
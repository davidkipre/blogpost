import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogpostListComponent } from './blogpost-list/blogpost-list.component';
import { BlogpostComponent } from './blogpost/blogpost.component';
import {ErrorpageComponent} from './errorpage/errorpage.component';
import {AdminComponent} from './admin/admin.component';
import { BlogpostEditComponent } from './blogpost-edit/blogpost-edit.component'
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: '', component: BlogpostListComponent },
  { path: 'blog-posts/:id', component: BlogpostComponent }, //blog-posts/:id est un nom (explicite) que nous donnons a notre path pour pouvoir l'utiliser
  { path: 'auth', component: AuthComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'admin/blog-posts/:id', component: BlogpostEditComponent },
  { path: '**', component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

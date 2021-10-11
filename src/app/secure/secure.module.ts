import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
//components
import {NavComponent} from "./nav/nav.component";
import {MenuComponent} from "./menu/menu.component";
import { SecureComponent } from './secure.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { MoviesComponent } from './movies/movies.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MovieCreateComponent } from './movies/movie-create/movie-create.component';
import { MovieSearchComponent } from './movies/movie-search/movie-search.component';
import { MovieCommentComponent } from './movies/movie-comment/movie-comment.component';
import { CommentsComponent } from './comments/comments.component';



@NgModule({
  declarations: [
    NavComponent,
    MenuComponent,
    SecureComponent,
    DashboardComponent,
    ProfileComponent,
    MoviesComponent,
    MovieEditComponent,
    MovieCreateComponent,
    MovieSearchComponent,
    MovieCommentComponent,
    CommentsComponent,
  ],
  exports: [
    SecureComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecureModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//components
import {LoginComponent} from "./public/login/login.component";
import {RegisterComponent} from "./public/register/register.component";
import {SecureComponent} from "./secure/secure.component";
import {PublicComponent} from "./public/public.component";
import {ProfileComponent} from "./secure/profile/profile.component";
import {DashboardComponent} from "./secure/dashboard/dashboard.component";
import {MoviesComponent} from "./secure/movies/movies.component";
import {MovieEditComponent} from "./secure/movies/movie-edit/movie-edit.component";
import {MovieCreateComponent} from "./secure/movies/movie-create/movie-create.component";
import {MovieSearchComponent} from "./secure/movies/movie-search/movie-search.component";
import {Error404Component} from "./public/error404/error404.component";
import {MovieCommentComponent} from "./secure/movies/movie-comment/movie-comment.component";
import {CommentsComponent} from "./secure/comments/comments.component";

const routes: Routes = [

  {
    path: '',
    component: SecureComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'search', component: MovieSearchComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movies/create', component: MovieCreateComponent },
      { path: 'movies/:id/edit', component: MovieEditComponent },
      { path: 'movies/comments', component: MovieCommentComponent },
      { path: 'comments', component: CommentsComponent },

    ]
  },

  {
    path:'',
    component: PublicComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: '**', component: Error404Component },  // Wildcard route for a 404 page

    ]
  },

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

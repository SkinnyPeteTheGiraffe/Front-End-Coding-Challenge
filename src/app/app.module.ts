import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import {HttpClientModule} from '@angular/common/http';
import { MovieInfoComponent } from './homepage/components/movie-info/movie-info.component';
import { MovieListComponent } from './homepage/components/movie-list/movie-list.component';
import {FormsModule} from '@angular/forms';
import {FilterPipe} from './homepage/components/movie-list/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MovieInfoComponent,
    MovieListComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  url = 'https://moviesfy.herokuapp.com/api/movies';
  //url = 'http://127.0.0.1:8000/api/movies';
  stageMovie = {
    id: "",
    name: "",
    description: "",
    year: "",
    genre: "",
    duration: "",
  };

  constructor(private http: HttpClient) { }

  getMovies(): Observable<any> {
    return this.http.get(`${this.url}`)
  }

  getDetailMovie(id){
    return this.http.get(`${this.url}` + id);
  }

  createMovie(data: any): any {
    const newMovie = {
      name: data.name,
      description: data.description,
      year: data.year,
      genre: data.genre,
      duration: data.duration
    };
    console.log("this is the movie");
    console.log(newMovie);
    return this.http.post(`${this.url}`, newMovie);
  }

  updateMovie(data: any): any {
    const updateMovie = {
      name: data.name,
      description: data.description,
      year: data.year,
      genre: data.genre,
      duration: data.duration
    };
    console.log("this is the movie");
    console.log(updateMovie);
    return this.http.post(`${this.url}` + "/" + data.id, updateMovie);
  }

  stageData(data: any): any{
    this.stageMovie = data;
  }

  GetStageData(){
    return this.stageMovie;
  }

  deleteMovie(id: any): any {
    return this.http.delete(`${this.url}` + "/" + id);
  }
}

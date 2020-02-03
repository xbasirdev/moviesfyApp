import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  id: any;
  newname: any;
  newdescription: any;
  newyear: any;
  newgenre: any;
  newduration: any;

  constructor(private movieService: MovieService) {
    const stageMovie = this.movieService.stagingData();
    console.log(stageMovie);
  
  }

  ngOnInit(): void {
    
  }

  getStage():void {
    const stageMovie = this.movieService.stagingData();
    this.newname = stageMovie.name;
  }

  logForm() {
    console.log(this.newname)
  }

  movieRegister(newname: any, newdescription: any, newyear: any, newgenre: any, newduration: any): void{
    if(this.id != "" || this.id != null){
      this.updateMovie(this.id, newname, newdescription, newyear, newgenre, newduration);
    }else{
      this.saveMovie(newname, newdescription, newyear, newgenre, newduration);
    }
  }

  saveMovie(newname: any, newdescription: any, newyear: any, newgenre: any, newduration: any): void {

    let datareq = {};
    if (newname === '' || newdescription === '') {
      //alert('le faltan campos por llenar');

    } else {
      datareq = {
        name: newname,
        description: newdescription,
        year: newyear + "",
        genre: newgenre,
        duration: newduration,
      };

      console.log(datareq);
      console.log("guardado de pelicula")
      
      this.movieService.createMovie(datareq)
        .subscribe(
          (res: any) => {
            console.log(res);
          }, (err: any) => {
            console.log(err);
          }
        );
    }

  }

  updateMovie(id: any, newname: any, newdescription: any, newyear: any, newgenre: any, newduration: any): void {

    let datareq = {};
    if (newname === '' || newdescription === '') {
      //alert('le faltan campos por llenar');

    } else {
      datareq = {
        id: id,
        name: newname,
        description: newdescription,
        year: newyear + "",
        genre: newgenre,
        duration: newduration,
      };

      console.log(datareq);
      console.log("actualizado de pelicula");
      
      this.movieService.updateMovie(datareq)
        .subscribe(
          (res: any) => {
            console.log(res);
          }, (err: any) => {
            console.log(err);
          }
        );
    }

  }

}

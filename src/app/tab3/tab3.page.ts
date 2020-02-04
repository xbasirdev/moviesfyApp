import { Component, OnInit } from '@angular/core';
import { Observable, generate } from 'rxjs';
import { MovieService } from '../service/movie.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

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

  moviesList: Array<{
    id: any, name: any, year: any, genre: any, description: any, duration: any
  }>;

  constructor(private movieService: MovieService, public loadingController: LoadingController, public alertController: AlertController ) {
  
  }

  ngOnInit(): void {
    
  }

  async sucessAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Se ha guardado correctamente el registro',
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Disculpe, ha habido un problema',
      buttons: ['OK'],
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere',
      duration: 7000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 3000,
      message: 'Porfavor espere',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  getAllMovies(): void {
    this.moviesList = [];
    this.movieService.getMovies().subscribe(
      (res: any) => {
        (res).forEach((element: any) => {
          const id = element.id;
          const name = element.name;
          const description = element.description;
          const year = element.year;
          const genre = element.genre;
          const duration = element.duration;
          this.moviesList.push({
            id, name, description, year, genre, duration,
          });
        });
      }, (err: any) => console.log(err)
    );

    console.log(this.moviesList);
  }

  logForm() {
    console.log(this.newname)
  }

  movieRegister(newname: any, newdescription: any, newyear: any, newgenre: any, newduration: any): void{
      this.saveMovie(newname, newdescription, newyear, newgenre, newduration);
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
      this.presentLoading();
      this.movieService.createMovie(datareq)
        .subscribe(
          (res: any) => {
            this.sucessAlert();
            this.getAllMovies();
            console.log(res);
            this.newname = "";
            this.newdescription = "";
            this.newyear = "";
            this.newgenre = "";
            this.newduration = "";
            const list = document.getElementById('tab-button-tab2');
            setTimeout(() => { list.click(); }, 200);
          }, (err: any) => {
            this.errorAlert();
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

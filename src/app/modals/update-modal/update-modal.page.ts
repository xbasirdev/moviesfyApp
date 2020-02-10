import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { MovieService } from '../../service/movie.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.page.html',
  styleUrls: ['./update-modal.page.scss'],
})
export class UpdateModalPage implements OnInit {

  id: any;
  newname: any;
  newdescription: any;
  newyear: any;
  newgenre: any;
  newduration: any;

  movie: any;

  moviesList: Array<{
    id: any, name: any, year: any, genre: any, description: any, duration: any
  }>;

  constructor(private modalController: ModalController, navParams: NavParams, private movieService: MovieService,
              public loadingController: LoadingController, public alertController: AlertController) { 
    this.movie = navParams.get('movie');
    console.log("this is the movie");
    console.log(this.movie);
    this.id = this.movie.id;
    this.newname = this.movie.name;
    this.newdescription = this.movie.description;
    this.newyear = this.movie.year;
    this.newduration = this.movie.duration;
    this.newgenre = this.movie.genre;
  }
  
  ngOnInit() {
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

  async closeModal(){
    await this.modalController.dismiss();
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

  movieRegister(newname: any, newdescription: any, newyear: any, newgenre: any, newduration: any): void{
    this.updateMovie(this.id, newname, newdescription, newyear, newgenre, newduration);
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
      this.presentLoading();
      this.movieService.updateMovie(datareq)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.presentLoading();
            this.sucessAlert();
            console.log(res);
            this.closeModal();
            this.getAllMovies();

          }, (err: any) => {
            console.log(err);
            this.errorAlert();
            this.closeModal();
            this.getAllMovies();
          }
        );
    }

  }

}

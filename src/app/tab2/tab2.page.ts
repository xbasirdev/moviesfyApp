import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../service/movie.service';
import { ActionSheetController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  results: Observable<any>;

  moviesList: Array<{
    id: any, name: any, year: any, genre: any, description: any, duration: any
  }>;

  constructor(private movieService: MovieService, private actionSheetCtrl: ActionSheetController, public loadingController: LoadingController, public alertController: AlertController) {
    this.getAllMovies();
  }

  ngOnInit(): void {

  }

  async sucessAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Se ha eliminado correctamente el registro',
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

  async presentActionSheet(item) {
    console.log("el id es " + item.id)
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Modificar',
          handler: () => {
            console.log("modificar");
          }
        },{
          text: 'Eliminar',
          handler: () => {
            this.deleteMovie(item.id); 
            this.presentLoading();
            setTimeout(() => { this.sucessAlert(); }, 5000);
            setTimeout(() => { this.getAllMovies(); }, 4000);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    (await actionSheet).present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Espere',
      duration: 5000,
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  deleteMovie(id): void {
    this.movieService.deleteMovie(id).subscribe(
      (res: any) => {
        (res).forEach((element: any) => {
          console.log("deleted");
          this.getAllMovies();

        });
      }, (err: any) => this.errorAlert()
    );

    console.log(this.moviesList);
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

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      this.getAllMovies();
      event.target.complete();
    }, 4000);
  }

}

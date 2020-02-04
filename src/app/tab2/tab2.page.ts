import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieService } from '../service/movie.service';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  results: Observable<any>;

  moviesList: Array<{
    id: any, name: any
  }>;

  constructor(private movieService: MovieService, private actionSheetCtrl: ActionSheetController) {
    this.getAllMovies();
  }

  ngOnInit(): void {

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

  deleteMovie(id): void {
    this.movieService.deleteMovie(id).subscribe(
      (res: any) => {
        (res).forEach((element: any) => {
          console.log("deleted");
          this.getAllMovies();
        });
      }, (err: any) => console.log(err)
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
          this.moviesList.push({
            id, name
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

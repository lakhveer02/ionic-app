import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent,InfiniteScrollCustomEvent, IonList, IonItem, IonAvatar,IonSkeletonText,IonAlert, IonLabel, IonBadge,IonInfiniteScroll,IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { MovieResult } from '../services/interface';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonBadge, IonLabel, IonAvatar, IonItem, IonList, IonHeader, IonToolbar, IonTitle, IonContent, IonList,IonSkeletonText,IonAlert,NgIf,NgFor,DatePipe,RouterModule,RouterLink,IonInfiniteScroll,IonInfiniteScrollContent],
})
export class HomePage {
  private cureentpage=1;
  private movieService =inject(MovieService)
  public error =null;
  public isLoading=false;
  public movies : MovieResult[]=[]
  public imageBaseUrl='https://image.tmdb.org/t/p';
  public dummyArray=new Array(5);
  
  constructor() {
    this.loadMovies()
  }
  loadMovies(event?:InfiniteScrollCustomEvent) {
    this.error=null 
    if(!event){
      this.isLoading=true;
    }
    this.movieService.getTopRatedMovies(this.cureentpage).pipe(
      finalize(()=>{
        this.isLoading=false;
        if(event){
          event.target.complete()
        }
      }),
      catchError((error : any)=>{
        console.log(error)
        this.error=error.error.status_massage;
        return[];
      }),
      // map((res)=>[] as const)
    ).subscribe({
      next:(res)=>{
        this.movies.push(...res.results)
        if(event){
          event.target.disabled= res.total_pages===this.cureentpage;
        }
      },
     
    })
  }
  loadMore(event:InfiniteScrollCustomEvent){
    this.cureentpage++;
    this.loadMovies(event)
    }
  trackFn(index: number, item: any): any {
    return item ? item.id : null; 
  }
  errorButtons = [{
    text: 'OK',
    handler: () => { console.log('OK clicked'); }
  }];
  
}

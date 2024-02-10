import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class RoutingService {
  url: string = '';


  savePreviousUrl(previousUrl: string): void {
    this.url = previousUrl;
    localStorage.setItem('previousUrl', this.url);
  }


  getPreviousUrl(): string {
    let previousUrl = localStorage.getItem('previousUrl');
    if (previousUrl) {
      this.url = previousUrl;
    }
    return this.url;
  }
}

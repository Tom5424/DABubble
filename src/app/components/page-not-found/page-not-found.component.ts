import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss' ,'./page-not-found.component.media.scss']
})


export class PageNotFoundComponent {

}

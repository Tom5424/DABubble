import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})


export class LegalNoticeComponent {

}

import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RoutingService } from '../../services/routing.service';


@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})


export class LegalNoticeComponent implements OnInit {
  routingService = inject(RoutingService);


  ngOnInit(): void {
    this.routingService.loadPreviousUrl();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { RoutingService } from '../../services/routing.service';


@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})


export class PrivacyPolicyComponent implements OnInit {
  routingService = inject(RoutingService);


  ngOnInit(): void {
    this.routingService.loadPreviousUrl();
  }
}

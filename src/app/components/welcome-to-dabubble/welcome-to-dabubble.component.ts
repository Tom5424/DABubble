import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-welcome-to-dabubble',
  standalone: true,
  imports: [],
  templateUrl: './welcome-to-dabubble.component.html',
  styleUrl: './welcome-to-dabubble.component.scss'
})


export class WelcomeToDabubbleComponent implements OnInit {
  routingService = inject(RoutingService);
  router = inject(Router);


  ngOnInit(): void {
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }
}

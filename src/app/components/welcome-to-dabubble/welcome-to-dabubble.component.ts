import { Component, OnInit, inject } from '@angular/core';
import { RoutingService } from '../../services/routing.service';
import { Router } from '@angular/router';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';


@Component({
  selector: 'app-welcome-to-dabubble',
  standalone: true,
  imports: [],
  templateUrl: './welcome-to-dabubble.component.html',
  styleUrls: ['./welcome-to-dabubble.component.scss', './welcome-to-dabubble.component.media.scss']
})


export class WelcomeToDabubbleComponent implements OnInit {
  routingService = inject(RoutingService);
  workspaceMenuService = inject(WorkspaceMenuService);
  router = inject(Router);


  ngOnInit(): void {
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }


  goToSidebarMobileView(): void {
    this.workspaceMenuService.sidebarIsHidden = false;
  }
}

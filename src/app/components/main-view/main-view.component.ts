import { Component, inject } from '@angular/core';
import { HeaderMainViewComponent } from '../header-main-view/header-main-view.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { WorkspaceMenuButtonComponent } from '../workspace-menu-button/workspace-menu-button.component';
import { NgClass } from '@angular/common';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';


@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [HeaderMainViewComponent, SidebarComponent, WorkspaceMenuButtonComponent, RouterOutlet, NgClass],
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss', './main-view.component.media.scss']
})


export class MainViewComponent {
  workspaceMenuService = inject(WorkspaceMenuService);
}

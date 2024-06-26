import { Component, inject } from '@angular/core';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-workspace-menu-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './workspace-menu-button.component.html',
  styleUrls: ['./workspace-menu-button.component.scss', './workspace-menu-button.component.media.scss']
})


export class WorkspaceMenuButtonComponent {
  workspaceMenu = inject(WorkspaceMenuService);


  showSidebar(): void {
    this.workspaceMenu.toggleSidebarService();
  }
}

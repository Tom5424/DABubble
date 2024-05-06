import { AsyncPipe, NgClass } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CreateChannelService } from '../../services/create-channel.service';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';


@Component({
  selector: 'app-channels-in-sidebar',
  standalone: true,
  imports: [NgClass, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './channels-in-sidebar.component.html',
  styleUrls: ['./channels-in-sidebar.component.scss', './channels-in-sidebar.component.media.scss']
})


export class ChannelsInSidebarComponent implements OnInit {
  createChannelService = inject(CreateChannelService);
  workspaceMenuService = inject(WorkspaceMenuService);
  matDialog = inject(MatDialog);
  channelListAreCollapsed: boolean = false;
  windowInnerWidth: number = 0;


  ngOnInit(): void {
    this.getWindowSize();
    this.createChannelService.getAllChannelsService();
  }


  getWindowSize(): void {
    this.windowInnerWidth = window.innerWidth;
  }


  foldInChannelList(): void {
    this.channelListAreCollapsed = !this.channelListAreCollapsed;
  }


  openDialogCreateChannel(): void {
    this.matDialog.open(DialogCreateChannelComponent);
  }


  channelsAreLoading(): boolean {
    return (this.createChannelService.loadChannels) ? true : false;
  }


  @HostListener('window:resize', ['$event'])
  checkWindowSize() {
    this.windowInnerWidth = window.innerWidth;
  }


  selectChannelInMobileView(): void {
    if (this.windowInnerWidth <= 1000) {
      this.workspaceMenuService.sidebarIsHidden = true;
      this.workspaceMenuService.inChatChannelMessagesMobileView = true;
    }
  }
}

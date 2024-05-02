import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CreateChannelService } from '../../services/create-channel.service';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-channels-in-sidebar',
  standalone: true,
  imports: [NgClass, AsyncPipe, RouterLink, RouterLinkActive],
  templateUrl: './channels-in-sidebar.component.html',
  styleUrls: ['./channels-in-sidebar.component.scss', './channels-in-sidebar.component.media.scss']
})


export class ChannelsInSidebarComponent implements OnInit {
  createChannelService = inject(CreateChannelService);
  matDialog = inject(MatDialog);
  channelListAreCollapsed: boolean = false;


  ngOnInit(): void {
    this.createChannelService.getAllChannelsService();
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
}

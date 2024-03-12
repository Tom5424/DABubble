import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CreateChannelService } from '../../services/create-channel.service';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-channels-in-sidebar',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './channels-in-sidebar.component.html',
  styleUrl: './channels-in-sidebar.component.scss'
})


export class ChannelsInSidebarComponent implements OnInit {
  createChannelService = inject(CreateChannelService);
  matDialog = inject(MatDialog);
  channelListAreCollapsed: boolean = false;


  ngOnInit(): void {
    this.createChannelService.checkIfChannelsExistingInDatabaseService();
    this.createChannelService.getAllChannelsService();
  }


  foldInChannelList(): void {
    this.channelListAreCollapsed = !this.channelListAreCollapsed;
  }


  openDialogCreateChannel(): void {
    this.matDialog.open(DialogCreateChannelComponent);
  }


  checkIfChannelsExistingInDatabase(): boolean {
    return (this.createChannelService.noChannelsExistingInDatabase) ? true : false;
  }


  channelsAreLoading(): boolean {
    return (this.createChannelService.loadChannels) ? true : false;
  }
}

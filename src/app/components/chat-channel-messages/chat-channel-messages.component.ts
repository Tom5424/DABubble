import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateChannelService } from '../../services/create-channel.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';


@Component({
  selector: 'app-chat-channel-messages',
  standalone: true,
  imports: [MatDialogModule, DialogEditChannelComponent],
  templateUrl: './chat-channel-messages.component.html',
  styleUrl: './chat-channel-messages.component.scss'
})


export class ChatChannelMessagesComponent implements OnInit {
  createChannelService = inject(CreateChannelService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  channelId: string | null = '';


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.channelId = params.get('id');
      this.createChannelService.getSingleChannelService(this.channelId);
    })
  }


  noProfileImgExist(user: User): boolean {
    return (!user.imgUrl) ? true : false;
  }


  // userIdMatchesWithIdFromLoggedinUser(userId: string): boolean {
  //   return (userId !== this.authService.auth.currentUser?.uid) ? true : false;
  // }


  arrayLengthIsEqualOrGreaterThan4(): boolean {
    return (this.createChannelService.channel.channelMembers.length >= 4) ? true : false;
  }


  openDialogToEditChannel(): void {
    this.matDialog.open(DialogEditChannelComponent, { data: { channelData: this.createChannelService.channel, channelId: this.channelId } });
  }
}

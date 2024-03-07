import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { CreateChannelService } from '../../services/create-channel.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})


export class SidebarComponent implements OnInit {
  createUserService = inject(CreateUserService);
  createChannelService = inject(CreateChannelService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  allUser: User[] = [];
  channelListAreCollapsed: boolean = false;
  contactListAreCollapsed: boolean = false;


  ngOnInit(): void {
    this.createUserService.checkIfContactsExistingInDatabaseService();
    this.createChannelService.checkIfChannelsExistingInDatabaseService();
    this.createChannelService.getAllChannelsService();
    this.getAllUsers();
  }


  getAllUsers() {
    this.createUserService.getAllUserService()
      .subscribe((userData) => {
        this.allUser = userData;
      })
  }


  foldInChannelList(): void {
    this.channelListAreCollapsed = !this.channelListAreCollapsed;
  }


  foldInContactList(): void {
    this.contactListAreCollapsed = !this.contactListAreCollapsed;
  }


  openDialogCreateChannel(): void {
    this.matDialog.open(DialogCreateChannelComponent);
  }


  noProfileImgExist(user: User): boolean {
    return (!user.imgUrl) ? true : false;
  }


  userIsOnline(user: User): boolean {
    return (user.isOnline) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(user: User): boolean {
    return user.userId == this.authService.user.userId;
  }


  checkIfContactsExistingInDatabase(): boolean {
    return (this.createUserService.noContactsExistingInDatabase) ? true : false;
  }


  checkIfChannelsExistingInDatabase(): boolean {
    return (this.createChannelService.noChannelsExistingInDatabase) ? true : false;
  }


  channelsAreLoading(): boolean {
    return (this.createChannelService.loadChannels) ? true : false;
  }


  contactsAreLoading(): boolean {
    return (this.createUserService.loadContacts) ? true : false;
  }
}
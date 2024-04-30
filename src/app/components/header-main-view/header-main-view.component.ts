import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDetailViewComponent } from '../dialog-profile-detail-view/dialog-profile-detail-view.component';
import { RouterLink } from '@angular/router';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { CreateChannelService } from '../../services/create-channel.service';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../models/user';
import { Channel } from '../../models/channel';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DirectMessage } from '../../models/direct-message';
import { CreateChannelMessageService } from '../../services/create-channel-message.service';
import { ChannelMessage } from '../../models/channel-message';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { HeaderMobileViewComponent } from '../header-mobile-view/header-mobile-view.component';


@Component({
  selector: 'app-header-main-view',
  standalone: true,
  imports: [HeaderMobileViewComponent, MatMenuModule, RouterLink, NgClass, AsyncPipe, DatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './header-main-view.component.html',
  styleUrls: ['./header-main-view.component.scss', './header-main-view.component.media.scss'],
})


export class HeaderMainViewComponent implements OnInit {
  createChannelService = inject(CreateChannelService);
  createUserService = inject(CreateUserService);
  createDirectMessageService = inject(CreateDirectMessageService);
  createChannelMessageService = inject(CreateChannelMessageService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  allUsers: User[] = [];
  allChannels: Channel[] = [];
  allDirectMessages: DirectMessage[] = [];
  allChannelMessages: ChannelMessage[] = [];
  filteredUsers!: Observable<User[]>;
  filteredChannels!: Observable<any[]>;
  filteredDirectMessages!: Observable<any[]>;
  filteredChannelMessages!: Observable<any[]>;
  menuSelectionIsOpen: boolean = false;
  inputField = new FormControl('');


  ngOnInit(): void {
    this.authService.getDataFromLoggedInUserService();
    this.authService.loadUserOnlineStatusService();
    this.getAllUsers();
    this.getAllChannels();
    this.getAllDirectMessages();
    this.getAllChannelMessages();
  }


  getAllUsers() {
    this.createUserService.getAllUserService()
      .subscribe((userData) => {
        this.allUsers = userData;
        this.getInputvalueToFilterUsers();
      });
  }


  getInputvalueToFilterUsers(): void {
    this.filteredUsers = this.inputField.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterUsersBasedOnInputvalue(value || ''))
    );
  }


  filterUsersBasedOnInputvalue(value: string): User[] {
    const searchValue = value.trim().toLowerCase();
    return this.allUsers.filter((user) => (user.name?.toLowerCase().includes(searchValue)));
  }


  getAllChannels() {
    this.createChannelService.getAllChannelsService()
      .subscribe((channelData) => {
        this.allChannels = channelData;
        this.getInputvalueToFilterChannels();
      });
  }


  getInputvalueToFilterChannels(): void {
    this.filteredChannels = this.inputField.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterChannelsBasedOnInputvalue(value || ''))
    );
  }


  filterChannelsBasedOnInputvalue(value: string): Channel[] {
    const searchValue = value.trim().toLowerCase();
    return this.allChannels.filter((channel) => (channel.channelName?.toLowerCase().includes(searchValue)));
  }


  getAllDirectMessages(): void {
    this.createDirectMessageService.getDirectMessagesWithoutParametersService()
      .subscribe((directMessageData) => {
        this.allDirectMessages = directMessageData;
        this.getInputvalueToFilterDirectMessages();
      })
  }


  getInputvalueToFilterDirectMessages(): void {
    this.filteredDirectMessages = this.inputField.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterDirectMessagesBasedOnInputvalue(value || ''))
    );
  }


  filterDirectMessagesBasedOnInputvalue(value: string): DirectMessage[] {
    const searchValue = value.trim().toLowerCase();
    return this.allDirectMessages.filter((directMessage) => (directMessage.messageText?.toLowerCase().includes(searchValue)));
  }


  getAllChannelMessages(): void {
    this.createChannelMessageService.getChannelMessagesWithoutParametersService()
      .subscribe((ChannelMessageData) => {
        this.allChannelMessages = ChannelMessageData;
        this.getInputvalueToFilterChannelMessages();
      })
  }


  getInputvalueToFilterChannelMessages(): void {
    this.filteredChannelMessages = this.inputField.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterChannelMessagesBasedOnInputvalue(value || ''))
    );
  }


  filterChannelMessagesBasedOnInputvalue(value: string): ChannelMessage[] {
    const searchValue = value.trim().toLowerCase();
    return this.allChannelMessages.filter((channelMessage) => (channelMessage.messageText?.toLowerCase().includes(searchValue)));
  }


  closeMenuSelectionIfClickOutside(): void {
    this.menuSelectionIsOpen = false;
    this.inputField.reset();
  }


  closeMenuSelection(): void {
    this.menuSelectionIsOpen = false;
    this.inputField.reset();
  }


  openMenuSelection(): void {
    this.menuSelectionIsOpen = true;
  }


  userDataLoading(): boolean {
    return (!this.authService.user.name && !this.authService.user.imgUrl) ? true : false;
  }


  noProfileImgExist(): boolean {
    return (!this.authService.user.imgUrl) ? true : false;
  }


  guestUserIsLoggedIn(): boolean {
    return (this.authService.auth.currentUser?.isAnonymous) ? true : false;
  }


  userIsOnline(): boolean {
    return (this.authService.user.isOnline) ? true : false;
  }


  userIdMatchesNotWithIdFromLoggedinUser(userId: string): boolean {
    return (userId !== this.authService.auth.currentUser?.uid) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(userId: string): boolean {
    return (userId == this.authService.auth.currentUser?.uid) ? true : false;
  }


  noProfileImgExistInMenuSelection(user: User | null): boolean {
    if (!user?.imgUrl) {
      return true
    } else {
      return false;
    }
  }


  userIsOnlineInMenuSelection(user: User): boolean {
    return (user.isOnline) ? true : false;
  }


  openProfileDetailView(): void {
    this.matDialog.open(DialogProfileDetailViewComponent, { position: { top: '95px', right: '25px' } });
  }


  logout(): void {
    this.authService.logoutService();
  }
}

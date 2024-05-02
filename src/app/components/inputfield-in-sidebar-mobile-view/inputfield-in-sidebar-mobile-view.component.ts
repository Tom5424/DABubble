import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { User } from '../../models/user';
import { Channel } from '../../models/channel';
import { DirectMessage } from '../../models/direct-message';
import { ChannelMessage } from '../../models/channel-message';
import { Observable, map, startWith } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CreateChannelService } from '../../services/create-channel.service';
import { CreateUserService } from '../../services/create-user.service';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { CreateChannelMessageService } from '../../services/create-channel-message.service';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';


@Component({
  selector: 'app-inputfield-in-sidebar-mobile-view',
  standalone: true,
  imports: [NgClass, AsyncPipe, DatePipe, RouterLink, ReactiveFormsModule],
  templateUrl: './inputfield-in-sidebar-mobile-view.component.html',
  styleUrl: './inputfield-in-sidebar-mobile-view.component.scss'
})


export class InputfieldInSidebarMobileViewComponent implements OnInit {
  authService = inject(AuthService);
  createChannelService = inject(CreateChannelService);
  createUserService = inject(CreateUserService);
  createDirectMessageService = inject(CreateDirectMessageService);
  createChannelMessageService = inject(CreateChannelMessageService);
  workspaceMenuService = inject(WorkspaceMenuService);
  allUsers: User[] = [];
  allChannels: Channel[] = [];
  allDirectMessages: DirectMessage[] = [];
  allChannelMessages: ChannelMessage[] = [];
  filteredUsers!: Observable<User[]>;
  filteredChannels!: Observable<any[]>;
  filteredDirectMessages!: Observable<any[]>;
  filteredChannelMessages!: Observable<any[]>;
  menuSelectionIsOpen: boolean = false;
  windowInnerWidth: number = 0;
  inputField = new FormControl('');


  ngOnInit(): void {
    this.getWindowSize();
    this.getAllUsers();
    this.getAllChannels();
    this.getAllDirectMessages();
    this.getAllChannelMessages();
  }


  getWindowSize(): void {
    this.windowInnerWidth = window.innerWidth;
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


  openMenuSelection(): void {
    this.menuSelectionIsOpen = true;
  }


  userIdMatchesNotWithIdFromLoggedinUser(userId: string): boolean {
    return (userId !== this.authService.auth.currentUser?.uid) ? true : false;
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


  userIdMatchesWithIdFromLoggedinUser(userId: string): boolean {
    return (userId == this.authService.auth.currentUser?.uid) ? true : false;
  }


  closeMenuSelection(): void {
    this.menuSelectionIsOpen = false;
    this.inputField.reset();
  }


  closeMenuSelectionIfClickOutside(): void {
    this.menuSelectionIsOpen = false;
    this.inputField.reset();
  }


  @HostListener('window:resize', ['$event'])
  checkWindowSize() {
    this.windowInnerWidth = window.innerWidth;
  }


  selectContactInMobileView(): void {
    if (this.windowInnerWidth <= 1000) {
      this.workspaceMenuService.sidebarIsHidden = true;
    }
  }
}

import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CreateChannelService } from '../../services/create-channel.service';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../models/user';
import { Channel } from '../../models/channel';
import { AuthService } from '../../services/auth.service';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [NgClass, NgStyle, ReactiveFormsModule, PickerComponent, AsyncPipe],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss'
})


export class NewMessageComponent implements OnInit {
  storageService = inject(StorageService);
  createChannelService = inject(CreateChannelService);
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  selectedUsers: User[] = [];
  selectedChannels: Channel[] | any = [];
  allUsers: User[] = [];
  allChannels: Channel[] = [];
  filteredUsers!: Observable<User[]>;
  filteredChannels!: Observable<Channel[]>;
  inputValue: string | null | undefined = '';
  emojiPickerIsDisplayed: boolean = false;
  usersInMenuSelectionAreDisplayed: boolean = false;
  channelsInMenuSelectionAreDisplayed: boolean = false;
  addMessageForm = new FormGroup({
    textarea: new FormControl('', Validators.required),
  })
  inputField = new FormControl('');


  constructor() {
    this.getAllUsers();
    this.getAllChannels();
  }


  getAllUsers() {
    this.createUserService.getAllUserService()
      .subscribe((userData) => {
        this.allUsers = userData;
      });
  }


  getAllChannels() {
    this.createChannelService.getAllChannelsService()
      .subscribe((channelData) => {
        this.allChannels = channelData;
      });
  }


  ngOnInit(): void {
    this.getInputvalueToFilterUsers();
    this.getInputvalueToFilterChannels();
  }


  getInputvalueToFilterUsers() {
    this.filteredUsers = this.inputField.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterUsersBasedOnInputvalue(value || '')),
    );
  }


  filterUsersBasedOnInputvalue(value: string): User[] {
    const searchValue = value.trim().toLowerCase();
    let searchValueWithoutAtSymboyl = '';
    if (searchValue.startsWith('@')) {
      searchValueWithoutAtSymboyl = searchValue.trim().replace('@', '');
      return this.allUsers.filter((user) => (user.name?.toLowerCase().includes(searchValueWithoutAtSymboyl)));
    } else {
      return this.allUsers.filter((user) => (user.name?.toLowerCase().includes(searchValue)));
    }
  }


  getInputvalueToFilterChannels() {
    this.filteredChannels = this.inputField.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterChannelsBasedOnInputvalue(value || '')),
    );
  }


  filterChannelsBasedOnInputvalue(value: string): Channel[] {
    const searchValue = value.trim().toLowerCase();
    let searchValueWithoutHashtagSymbol = '';
    if (searchValue.startsWith('#')) {
      searchValueWithoutHashtagSymbol = searchValue.replace('#', '');
      return this.allChannels.filter((channel) => (channel.channelName?.toLowerCase().includes(searchValueWithoutHashtagSymbol)));
    } else {
      return this.allChannels.filter((channel) => (channel.channelName?.toLowerCase().includes(searchValue)));
    }
  }


  sendMessage(): void {
    
  }


  selectUser(selectedUser: User): void {
    const indexFromSelectedUser = this.selectedUsers.findIndex((user) => user.userId == selectedUser.userId)
    if (indexFromSelectedUser == -1) {
      this.selectedUsers.push(selectedUser);
    } else {
      this.selectedUsers.splice(indexFromSelectedUser, 1);
    }
    this.channelsInMenuSelectionAreDisplayed = false;
    this.usersInMenuSelectionAreDisplayed = false;
    this.inputField.reset();
  }


  checkIfUserAlreadySelected(user: User): boolean {
    return this.selectedUsers.includes(user);
  }


  removeSelectedUser(index: number): void {
    this.selectedUsers.splice(index, 1);
  }


  selectChannel(selectedChannel: any): void {
    const indexFromSelectedChannel = this.selectedChannels.findIndex((channel: any) => channel.id == selectedChannel.id)
    if (indexFromSelectedChannel == -1) {
      this.selectedChannels.push(selectedChannel);
    } else {
      this.selectedChannels.splice(indexFromSelectedChannel, 1);
    }
    this.channelsInMenuSelectionAreDisplayed = false;
    this.usersInMenuSelectionAreDisplayed = false;
    this.inputField.reset();
  }


  checkIfChannelAlreadySelected(channel: Channel): boolean {
    return this.selectedChannels.includes(channel);
  }


  removeSelectedChannel(index: number): void {
    this.selectedChannels.splice(index, 1);
  }


  openUserAndChannelMenuSelection(): void {
    this.usersInMenuSelectionAreDisplayed = true;
    this.channelsInMenuSelectionAreDisplayed = true;
  }


  imageIsUploading(): boolean {
    return (this.storageService.uploadImg) ? true : false;
  }


  noProfileImgExist(user: User): boolean {
    return (!user.imgUrl) ? true : false;
  }


  userIsOnline(user: User): boolean {
    return (user.isOnline) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(userId: string): boolean {
    return (userId !== this.authService.auth.currentUser?.uid) ? true : false;
  }


  removeUploadedImage(indexFromImage: number): void {
    this.storageService.uploadedImages.splice(indexFromImage, 1);
    if (this.storageService.uploadedImages.length == 0) {
      this.storageService.imgIsUploaded = false;
    }
  }


  openImageDetailView(uploadedImage: string): void {
    this.matDialog.open(DialogUploadedImgFullViewComponent, { data: { uploadedImage: uploadedImage } });
  }


  closeEmojiPickerOrOtherMenuIfClickOutside(): void {
    this.emojiPickerIsDisplayed = false;
    this.usersInMenuSelectionAreDisplayed = false;
    this.channelsInMenuSelectionAreDisplayed = false;
    this.inputField.reset();
  }


  selectEmoji(event: EmojiEvent): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    this.inputValue += event.emoji.native ? event.emoji.native : '';
    this.addMessageForm.patchValue({
      textarea: this.inputValue,
    });
  }


  tootgleEmojiPicker() {
    this.emojiPickerIsDisplayed = !this.emojiPickerIsDisplayed;
  }



  selectFile(selectedFile: HTMLInputElement): void {
    this.storageService.selectFileService(selectedFile);
  }
}

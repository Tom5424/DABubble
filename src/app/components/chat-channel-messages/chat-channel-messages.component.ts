import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreateChannelService } from '../../services/create-channel.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogEditChannelComponent } from '../dialog-edit-channel/dialog-edit-channel.component';
import { DialogChannelMembersComponent } from '../dialog-channel-members/dialog-channel-members.component';
import { DialogAddMorePeopleToChannelComponent } from '../dialog-add-more-people-to-channel/dialog-add-more-people-to-channel.component';
import { StorageService } from '../../services/storage.service';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { CreateChannelMessageService } from '../../services/create-channel-message.service';
import { ChannelMessageComponent } from '../channel-message/channel-message.component';
import { ChannelMessage } from '../../models/channel-message';


@Component({
  selector: 'app-chat-channel-messages',
  standalone: true,
  imports: [NgStyle, NgClass, AsyncPipe, DatePipe, MatDialogModule, PickerComponent, ReactiveFormsModule, ChannelMessageComponent, DialogEditChannelComponent, DialogChannelMembersComponent, DialogAddMorePeopleToChannelComponent],
  templateUrl: './chat-channel-messages.component.html',
  styleUrl: './chat-channel-messages.component.scss'
})


export class ChatChannelMessagesComponent implements OnInit {
  createChannelService = inject(CreateChannelService);
  authService = inject(AuthService);
  storageService = inject(StorageService)
  createChannelMessageService = inject(CreateChannelMessageService)
  renderer2 = inject(Renderer2);
  matDialog = inject(MatDialog);
  activatedRoute = inject(ActivatedRoute);
  @ViewChild('scrollingContainer') scrollingContainer!: ElementRef;
  emojiPickerIsDisplayed: boolean = false;
  channelId: string | null = '';
  inputValue: string | null | undefined = '';
  addMessageForm = new FormGroup({
    textarea: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.channelId = params.get('id');
      this.createChannelService.getSingleChannelService(this.channelId);
      this.createChannelMessageService.getChannelMessagesService(this.channelId);
    })
  }


  sendMessageToChannel(): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if (this.inputValue?.trim() !== '' || this.storageService.uploadedImages.length >= 1) {
      this.createChannelMessageService.createChannelMessageService(this.authService.user, this.channelId, this.inputValue, this.storageService.uploadedImages);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
      this.storageService.uploadedImages = [];
    }
  }


  sendMessageToChannelIfPressOnEnterKey(event: KeyboardEvent): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if ((event?.key == 'Enter' && this.inputValue?.trim() !== '') || (event.key == 'Enter' && this.inputValue?.trim() == '' && this.storageService.uploadedImages.length >= 1)) {
      this.createChannelMessageService.createChannelMessageService(this.authService.user, this.channelId, this.inputValue, this.storageService.uploadedImages);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
      this.storageService.uploadedImages = [];
    }
  }


  scrollToBottomAfterSendMessage(): void {
    setTimeout(() => { // Uses setTimeout to always scroll to the bottom
      const scrollingContainer = this.scrollingContainer.nativeElement;
      this.renderer2.setProperty(scrollingContainer, 'scrollTop', scrollingContainer.scrollHeight);
    }, 50);
  }


  chatAreLoading(): boolean {
    return (this.createChannelMessageService.loadChat) ? true : false;
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


  imageIsUploading(): boolean {
    return (this.storageService.uploadImg) ? true : false;
  }


  removeUploadedImage(indexFromImage: number): void {
    this.storageService.uploadedImages.splice(indexFromImage, 1);
    if (this.storageService.uploadedImages.length == 0) {
      this.storageService.imgIsUploaded = false;
    }
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


  closeEmojiPickerOrOtherMenuIfClickOutside(): void {
    this.emojiPickerIsDisplayed = false;
  }


  selectFile(selectedFile: HTMLInputElement): void {
    this.storageService.selectFileService(selectedFile);
  }


  openImageDetailView(uploadedImage: string): void {
    this.matDialog.open(DialogUploadedImgFullViewComponent, { data: { uploadedImage: uploadedImage } });
  }


  openDialogToEditChannel(): void {
    this.matDialog.open(DialogEditChannelComponent, { data: { channelData: this.createChannelService.channel, channelId: this.channelId } });
  }


  openDialogToShowAllChannelMembers(): void {
    this.matDialog.open(DialogChannelMembersComponent, { position: { top: '185px', left: '670px' }, data: { channelMembers: this.createChannelService.channel.channelMembers, channelId: this.channelId } });
  }


  openDialogToAddMorePeopleToChannel(): void {
    this.matDialog.open(DialogAddMorePeopleToChannelComponent, { position: { top: '185px', left: '560px' }, data: { channelName: this.createChannelService.channel.channelName, channelMembers: this.createChannelService.channel.channelMembers, channelId: this.channelId } });
  }


  isToday(channelMessage: ChannelMessage): boolean {
    const today = new Date();
    const currentDateMessage = new Date(channelMessage.senderTime);
    return (today.toDateString() == currentDateMessage.toDateString());
  }


  isYesterday(channelMessage: ChannelMessage): boolean {
    const messageThatOneDayOld = new Date();
    const currentDateMessage = new Date(channelMessage.senderTime);
    messageThatOneDayOld.setDate(messageThatOneDayOld.getDate() - 1);
    return (messageThatOneDayOld.toDateString() == currentDateMessage.toDateString());
  }
}
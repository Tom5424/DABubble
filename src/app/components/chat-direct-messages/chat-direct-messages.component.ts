import { Component, ElementRef, ViewChild, inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { CreateUserService } from '../../services/create-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDetailViewInChatComponent } from '../dialog-profile-detail-view-in-chat/dialog-profile-detail-view-in-chat.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { MessageComponent } from '../message/message.component';
import { DirectMessage } from '../../models/direct-message';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';
import { StorageService } from '../../services/storage.service';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@Component({
  selector: 'app-chat-direct-messages',
  standalone: true,
  imports: [PickerComponent, NgStyle, NgClass, ReactiveFormsModule, AsyncPipe, DatePipe, MessageComponent, RouterOutlet],
  templateUrl: './chat-direct-messages.component.html',
  styleUrl: './chat-direct-messages.component.scss'
})


export class ChatDirectMessagesComponent {
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  createDirectMessageService = inject(CreateDirectMessageService);
  storageService = inject(StorageService)
  workspaceMenuService = inject(WorkspaceMenuService);
  activatedRoute = inject(ActivatedRoute);
  matDialog = inject(MatDialog);
  renderer2 = inject(Renderer2);
  router = inject(Router);
  @ViewChild('scrollingContainer') scrollingContainer!: ElementRef;
  userId: string | null = '';
  inputValue: string | null | undefined = '';
  emojiPickerIsDisplayed: boolean = false;
  addMessageForm = new FormGroup({
    textarea: new FormControl('', Validators.required)
  })


  constructor() {
    this.getSelectedUserInSidebar();
  }


  getSelectedUserInSidebar(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.createUserService.getSingelUserService(this.userId)
      this.createDirectMessageService.getDirectMessagesService(this.userId, this.authService.user.userId);
    });
  }


  openProfileDetailView(): void {
    this.matDialog.open(DialogProfileDetailViewInChatComponent, { data: { userData: this.createUserService.user }, autoFocus: false });
  }


  sendDirectMessage(): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if (this.inputValue?.trim() !== '' || this.storageService.uploadedImages.length >= 1) {
      this.createDirectMessageService.createDirectMessageService(this.authService.user, this.userId, this.authService.user.userId, this.inputValue, this.storageService.uploadedImages);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
      this.storageService.uploadedImages = [];
    }
  }


  sendDirectMessageIfPressOnEnterKey(event: KeyboardEvent): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if ((event?.key == 'Enter' && this.inputValue?.trim() !== '') || (event.key == 'Enter' && this.inputValue?.trim() == '' && this.storageService.uploadedImages.length >= 1)) {
      this.createDirectMessageService.createDirectMessageService(this.authService.user, this.userId, this.authService.user.userId, this.inputValue, this.storageService.uploadedImages);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
      this.storageService.uploadedImages = [];
    }
  }


  noProfileImgExist(): boolean {
    return (!this.createUserService.user.imgUrl) ? true : false;
  }


  userIsOnline(): boolean {
    return (this.createUserService.user.isOnline) ? true : false;
  }


  chatAreLoading(): boolean {
    return (this.createDirectMessageService.loadChat) ? true : false;
  }


  imageIsUploading(): boolean {
    return (this.storageService.uploadImg) ? true : false;
  }


  scrollToBottomAfterSendMessage(): void {
    setTimeout(() => { // Uses setTimeout to always scroll to the bottom
      const scrollingContainer = this.scrollingContainer.nativeElement;
      this.renderer2.setProperty(scrollingContainer, 'scrollTop', scrollingContainer.scrollHeight);
    }, 50);
  }


  selectFile(selectedFile: HTMLInputElement): void {
    this.storageService.selectFileService(selectedFile);
  }


  closeEmojiPickerOrOtherMenuIfClickOutside(): void {
    this.emojiPickerIsDisplayed = false;
  }


  tootgleEmojiPicker() {
    this.emojiPickerIsDisplayed = !this.emojiPickerIsDisplayed;
  }


  selectEmoji(event: EmojiEvent): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    this.inputValue += event.emoji.native ? event.emoji.native : '';
    this.addMessageForm.patchValue({
      textarea: this.inputValue,
    });
  }


  // addAtLetterToMentionSomebody(atLetter: string): void {
  //   this.inputValue = this.addMessageForm.controls.textarea.value;
  //   this.inputValue += atLetter;
  //   this.addMessageForm.patchValue({
  //     textarea: this.inputValue,
  //   });
  // }


  // openUserMenuSelectionToMentionAUser(): void {
  //   const mentionRegex = this.inputValue?.match(/(?:^|\s|^@)@[^@\s]*(?:\s+@[^@\s]+)*$/);
  //   if (mentionRegex) {
  //     this.userMenuSelectionIsOpen = true;
  //   } else {
  //     this.userMenuSelectionIsOpen = false;
  //   }
  // }


  removeUploadedImage(indexFromImage: number): void {
    this.storageService.uploadedImages.splice(indexFromImage, 1);
    if (this.storageService.uploadedImages.length == 0) {
      this.storageService.imgIsUploaded = false;
    }
  }


  openImageDetailView(uploadedImage: string): void {
    this.matDialog.open(DialogUploadedImgFullViewComponent, { data: { uploadedImage: uploadedImage } });
  }


  isToday(directMessage: DirectMessage): boolean {
    const today = new Date();
    const currentDateMessage = new Date(directMessage.senderTime);
    return (today.toDateString() == currentDateMessage.toDateString());
  }


  isYesterday(directMessage: DirectMessage): boolean {
    const messageThatOneDayOld = new Date();
    const currentDateMessage = new Date(directMessage.senderTime);
    messageThatOneDayOld.setDate(messageThatOneDayOld.getDate() - 1);
    return (messageThatOneDayOld.toDateString() == currentDateMessage.toDateString());
  }
}
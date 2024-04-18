import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { StorageInThreadService } from '../../services/storage-in-thread.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CreateChannelService } from '../../services/create-channel.service';
import { CreateThreadMessageInChannelMessageService } from '../../services/create-thread-message-in-channel-message.service';
import { MessageInThreadChannelMessageComponent } from '../message-in-thread-channel-message/message-in-thread-channel-message.component';


@Component({
  selector: 'app-thread-channel-message',
  standalone: true,
  imports: [NgClass, NgStyle, RouterLink, AsyncPipe, ReactiveFormsModule, PickerComponent, MessageInThreadChannelMessageComponent],
  templateUrl: './thread-channel-message.component.html',
  styleUrl: './thread-channel-message.component.scss'
})


export class ThreadChannelMessageComponent implements OnInit {
  createThreadMessageInChannelMessageService = inject(CreateThreadMessageInChannelMessageService);
  createChannelService = inject(CreateChannelService);
  storageInThreadService = inject(StorageInThreadService);
  authService = inject(AuthService);
  renderer2 = inject(Renderer2);
  matDialog = inject(MatDialog);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  @ViewChild('scrollingContainer') scrollingContainer!: ElementRef;
  channelMessageId: string = '';
  threadMessageId: string | null = '';
  inputValue: string | null | undefined = '';
  emojiPickerIsDisplayed: boolean = false;
  addMessageForm = new FormGroup({
    textarea: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    this.getUrlFromRoute();
    this.getIdFromActivatedRoute();
  }


  getUrlFromRoute(): void {
    let url = this.router.url;
    let splittedUrl = url.split('/');
    this.channelMessageId = splittedUrl[3];
  }


  getIdFromActivatedRoute(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.threadMessageId = params.get('id');
      this.createThreadMessageInChannelMessageService.getThreadMessagesService(this.threadMessageId);
    });
  }


  sendMessage(): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if (this.inputValue?.trim() !== '' || this.storageInThreadService.uploadedImagesInThread.length >= 1) {
      this.createThreadMessageInChannelMessageService.createThreadMessageService(this.authService.user, this.threadMessageId, this.inputValue, this.storageInThreadService.uploadedImagesInThread);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
      this.storageInThreadService.uploadedImagesInThread = [];
    }
  }


  sendMessageIfPressOnEnterKey(event: KeyboardEvent) {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if ((event?.key == 'Enter' && this.inputValue?.trim() !== '') || (event.key == 'Enter' && this.inputValue?.trim() == '' && this.storageInThreadService.uploadedImagesInThread.length >= 1)) {
      this.createThreadMessageInChannelMessageService.createThreadMessageService(this.authService.user, this.threadMessageId, this.inputValue, this.storageInThreadService.uploadedImagesInThread);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
      this.storageInThreadService.uploadedImagesInThread = [];
    }
  }


  scrollToBottomAfterSendMessage(): void {
    setTimeout(() => { // Uses setTimeout to always scroll to the bottom
      const scrollingContainer = this.scrollingContainer.nativeElement;
      this.renderer2.setProperty(scrollingContainer, 'scrollTop', scrollingContainer.scrollHeight);
    }, 50);
  }


  closeEmojiPickerOrOtherMenuIfClickOutside(): void {
    this.emojiPickerIsDisplayed = false;
  }


  chatAreLoading(): boolean {
    return (this.createThreadMessageInChannelMessageService.loadChat) ? true : false;
  }


  imageIsUploadingInThread(): boolean {
    return (this.storageInThreadService.uploadImgInThread) ? true : false;
  }


  removeUploadedImageInThread(indexFromImage: number): void {
    this.storageInThreadService.uploadedImagesInThread.splice(indexFromImage, 1);
    if (this.storageInThreadService.uploadedImagesInThread.length == 0) {
      this.storageInThreadService.imgIsUploadedInThread = false;
    }
  }


  openImageDetailView(uploadedImage: string): void {
    this.matDialog.open(DialogUploadedImgFullViewComponent, { data: { uploadedImage: uploadedImage } });
  }


  selectEmoji(event: EmojiEvent): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    this.inputValue += event.emoji.native ? event.emoji.native : '';
    this.addMessageForm.patchValue({
      textarea: this.inputValue,
    });
  }


  selectFile(selectedFile: HTMLInputElement): void {
    this.storageInThreadService.selectFileInThreadService(selectedFile);
  }


  tootgleEmojiPicker() {
    this.emojiPickerIsDisplayed = !this.emojiPickerIsDisplayed;
  }
}

import { NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { StorageInThreadService } from '../../services/storage-in-thread.service';
import { Router, RouterLink } from '@angular/router';
import { MessageInThreadDirectMessageComponent } from '../message-in-thread-direct-message/message-in-thread-direct-message.component';


@Component({
  selector: 'app-thread-direct-message',
  standalone: true,
  imports: [NgClass, NgStyle, ReactiveFormsModule, PickerComponent, RouterLink, MessageInThreadDirectMessageComponent],
  templateUrl: './thread-direct-message.component.html',
  styleUrl: './thread-direct-message.component.scss'
})


export class ThreadDirectMessageComponent implements OnInit {
  createDirectMessageService = inject(CreateDirectMessageService);
  authService = inject(AuthService);
  storageInThreadService = inject(StorageInThreadService);
  renderer2 = inject(Renderer2);
  matDialog = inject(MatDialog);
  router = inject(Router);
  @ViewChild('scrollingContainer') scrollingContainer!: ElementRef;
  emojiPickerIsDisplayed: boolean = false;
  inputValue: string | null | undefined = '';
  directMesageId: string = '';
  addMessageForm = new FormGroup({
    textarea: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    let url = this.router.url;
    let splittedUrl = url.split('/');
    this.directMesageId = splittedUrl[3];
  }


  sendMessage(): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if (this.inputValue?.trim() !== '' || this.storageInThreadService.uploadedImagesInThread.length >= 1) {
      this.createDirectMessageService.createDirectMessageService(this.authService.user, this.directMesageId, this.authService.user.userId, this.inputValue, this.storageInThreadService.uploadedImagesInThread);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
      this.storageInThreadService.uploadedImagesInThread = [];
    }
  }


  sendMessageIfPressOnEnterKey(event: KeyboardEvent) {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if ((event?.key == 'Enter' && this.inputValue?.trim() !== '') || (event.key == 'Enter' && this.inputValue?.trim() == '' && this.storageInThreadService.uploadedImagesInThread.length >= 1)) {
      this.createDirectMessageService.createDirectMessageService(this.authService.user, this.directMesageId, this.authService.user.userId, this.inputValue, this.storageInThreadService.uploadedImagesInThread);
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


  tootgleEmojiPicker() {
    this.emojiPickerIsDisplayed = !this.emojiPickerIsDisplayed;
  }


  closeEmojiPickerOrOtherMenuIfClickOutside(): void {
    this.emojiPickerIsDisplayed = false;
  }


  selectFile(selectedFile: HTMLInputElement): void {
    this.storageInThreadService.selectFileInThreadService(selectedFile);
  }
}

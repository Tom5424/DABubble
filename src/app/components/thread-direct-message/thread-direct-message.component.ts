import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { StorageInThreadService } from '../../services/storage-in-thread.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageInThreadDirectMessageComponent } from '../message-in-thread-direct-message/message-in-thread-direct-message.component';
import { CreateThreadMessageInDirectMessageService } from '../../services/create-thread-message-in-direct-message.service';
import { RoutingService } from '../../services/routing.service';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';


@Component({
  selector: 'app-thread-direct-message',
  standalone: true,
  imports: [NgClass, NgStyle, ReactiveFormsModule, PickerComponent, RouterLink, MessageInThreadDirectMessageComponent, AsyncPipe],
  templateUrl: './thread-direct-message.component.html',
  styleUrls: ['./thread-direct-message.component.scss', './thread-direct-message.component.media.scss'],
})


export class ThreadDirectMessageComponent implements OnInit {
  createThreadMessageInDirectMessageService = inject(CreateThreadMessageInDirectMessageService);
  authService = inject(AuthService);
  storageInThreadService = inject(StorageInThreadService);
  routingService = inject(RoutingService);
  workspaceMenuService = inject(WorkspaceMenuService);
  renderer2 = inject(Renderer2);
  matDialog = inject(MatDialog);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  @ViewChild('scrollingContainer') scrollingContainer!: ElementRef;
  emojiPickerIsDisplayed: boolean = false;
  inputValue: string | null | undefined = '';
  directMesageId: string = '';
  threadMessageId: string | null = '';
  windowInnerWidth: number = 0;
  addMessageForm = new FormGroup({
    textarea: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
    this.getWindowSize();
    this.getUrlFromRoute();
    this.getIdFromActivatedRoute();
    this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
  }


  getWindowSize(): void {
    this.windowInnerWidth = window.innerWidth;
  }


  getUrlFromRoute(): void {
    let url = this.router.url;
    let splittedUrl = url.split('/');
    this.directMesageId = splittedUrl[3];
  }


  getIdFromActivatedRoute(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.threadMessageId = params.get('id');
      this.routingService.savePreviousUrl(this.router.routerState.snapshot.url);
      this.createThreadMessageInDirectMessageService.getThreadMessagesService(this.threadMessageId);
    });
  }


  sendMessage(): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if (this.inputValue?.trim() !== '' || this.storageInThreadService.uploadedImagesInThread.length >= 1) {
      this.createThreadMessageInDirectMessageService.createThreadMessageService(this.authService.user, this.threadMessageId, this.inputValue, this.storageInThreadService.uploadedImagesInThread);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
      this.storageInThreadService.uploadedImagesInThread = [];
    }
  }


  sendMessageIfPressOnEnterKey(event: KeyboardEvent) {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    if ((event?.key == 'Enter' && this.inputValue?.trim() !== '') || (event.key == 'Enter' && this.inputValue?.trim() == '' && this.storageInThreadService.uploadedImagesInThread.length >= 1)) {
      this.createThreadMessageInDirectMessageService.createThreadMessageService(this.authService.user, this.threadMessageId, this.inputValue, this.storageInThreadService.uploadedImagesInThread);
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


  chatAreLoading(): boolean {
    return (this.createThreadMessageInDirectMessageService.loadChat) ? true : false;
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


  @HostListener('window:resize', ['$event'])
  checkWindowSize() {
    this.windowInnerWidth = window.innerWidth;
  }


  closeThreadInMobileView(): void {
    if (this.windowInnerWidth <= 1000) {
      this.workspaceMenuService.inThreadDirectMessagesMobileView = false;
    }
  }


  selectFile(selectedFile: HTMLInputElement): void {
    this.storageInThreadService.selectFileInThreadService(selectedFile);
  }
}

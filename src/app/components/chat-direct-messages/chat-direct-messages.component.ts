import { Component, ElementRef, ViewChild, inject, Renderer2 } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CreateUserService } from '../../services/create-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDetailViewInChatComponent } from '../dialog-profile-detail-view-in-chat/dialog-profile-detail-view-in-chat.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { MessageComponent } from '../message/message.component';
import { DirectMessage } from '../../models/direct-message';
import { CustomDatePipe } from '../../pipes/custom-date.pipe';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';


@Component({
  selector: 'app-chat-direct-messages',
  standalone: true,
  imports: [QuillModule, NgStyle, NgClass, ReactiveFormsModule, AsyncPipe, DatePipe, MessageComponent, CustomDatePipe, RouterOutlet],
  templateUrl: './chat-direct-messages.component.html',
  styleUrl: './chat-direct-messages.component.scss'
})


export class ChatDirectMessagesComponent {
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  createDirectMessageService = inject(CreateDirectMessageService);
  activatedRoute = inject(ActivatedRoute);
  matDialog = inject(MatDialog);
  renderer2 = inject(Renderer2);
  workspaceMenu = inject(WorkspaceMenuService);
  @ViewChild('scrollingContainer') scrollingContainer!: ElementRef
  userId: string | null = '';
  inputValue: string | null = '';
  filteredInpuvalueWithRegex: number | undefined;
  senderTimeFromSendedMessage: number = 0;
  keyEnterWasPressed: boolean = false;
  addMessageForm = new FormGroup({
    inputfieldQuillEditor: new FormControl('', Validators.required)
  })


  constructor() {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.createUserService.getSingelUserService(this.userId)
      this.createDirectMessageService.getDirectMessagesService(this.userId);
    });
  }


  openProfileDetailView(): void {
    this.matDialog.open(DialogProfileDetailViewInChatComponent, { data: { userData: this.createUserService.user }, autoFocus: false });
  }


  sendDirectMessage(): void {
    this.inputValue = this.addMessageForm.controls.inputfieldQuillEditor.value;
    const inputValueWithoutHTMLTags = this.inputValue?.replace(/<[^>]*>/g, ''); // The regular expression removes the HTML tags from the string that come from the Quill Editor
    this.filteredInpuvalueWithRegex = this.inputValue?.replace(/(<([^>]+)>)/ig, '').length; // The regular expression checks whether the HTML tags from the Quill Editor are empty. If so, empty messages will be prevented from being sent. 
    if (this.filteredInpuvalueWithRegex && this.filteredInpuvalueWithRegex > 0) {
      this.createDirectMessageService.createDirectMessageService(this.authService.user, this.userId, inputValueWithoutHTMLTags || null);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
    }
  }


  sendDirectMessageIfPressOnEnterKey(event: KeyboardEvent): void {
    this.inputValue = this.addMessageForm.controls.inputfieldQuillEditor.value;
    const inputValueWithoutHTMLTags = this.inputValue?.replace(/<[^>]*>/g, ''); // The regular expression removes the HTML tags from the string that come from the Quill Editor
    this.filteredInpuvalueWithRegex = this.inputValue?.replace(/(<([^>]+)>)/ig, '').length; // The regular expression checks whether the HTML tags from the Quill Editor are empty. If so, empty messages will be prevented from being sent. 
    if (event?.key == 'Enter' && this.filteredInpuvalueWithRegex && this.filteredInpuvalueWithRegex > 0) {
      this.createDirectMessageService.createDirectMessageService(this.authService.user, this.userId, inputValueWithoutHTMLTags || null);
      this.scrollToBottomAfterSendMessage();
      this.addMessageForm.reset();
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


  focusQuillEditor(event: { editor: any, range: any, oldRange: any }): void {
    if (this.quillEditorIsFocused(event)) {
      event.editor.container.style.border = '1px solid #535AF1';
      event.editor.container.style.color = '#000000';
    } else if (this.quillEditorIsNotFocused(event)) {
      event.editor.container.style.border = '1px solid #adb0d9';
      event.editor.container.style.color = '#686868';
    }
  }


  quillEditorIsFocused(event: { editor: any, range: any, oldRange: any }): boolean {
    return (event.oldRange == null) ? true : false;
  }


  quillEditorIsNotFocused(event: { editor: any, range: any, oldRange: any }): boolean {
    return (event.range == null) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.createUserService.user.userId == this.authService.auth.currentUser?.uid) ? true : false;
  }


  scrollToBottomAfterSendMessage(): void {
    setTimeout(() => { // Uses setTimeout to always scroll to the bottom
      const scrollingContainer = this.scrollingContainer.nativeElement;
      this.renderer2.setProperty(scrollingContainer, 'scrollTop', scrollingContainer.scrollHeight);
    }, 50);
  }


  setSenderTimeFromSendedMessage(directMessage: DirectMessage): void {
    this.senderTimeFromSendedMessage = directMessage.senderTime;
  }


  // isToday(senderTimeFromSendedMessage: number): boolean {
  //   const today = new Date();
  //   const dateWhenTheMessageWasSent = new Date(senderTimeFromSendedMessage);
  //   return today.toDateString() === dateWhenTheMessageWasSent.toDateString();
  // }


  // isYesterday(senderTimeFromSendedMessage: number): boolean {
  //   const yesterday = new Date();
  //   yesterday.setDate(yesterday.getDate() - 1);
  //   const dateWhenTheMessageWasSent = new Date(senderTimeFromSendedMessage);
  //   return yesterday.toDateString() === dateWhenTheMessageWasSent.toDateString();
  // }


  // isOlderThanTwoDays(): boolean {
  //   const today = new Date();
  //   const twoDaysAgo = new Date(today);
  //   const dateWhenTheMessagewasSend = new Date(this.senderTimeFromSendedMessage);
  //   twoDaysAgo.setDate(today.getDate() - 2);
  //   return dateWhenTheMessagewasSend < twoDaysAgo;
  // }
}
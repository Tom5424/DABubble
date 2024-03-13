import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CreateUserService } from '../../services/create-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDetailViewInChatComponent } from '../dialog-profile-detail-view-in-chat/dialog-profile-detail-view-in-chat.component';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, NgClass, NgStyle } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DirectMessageComponent } from '../direct-message/direct-message.component';


@Component({
  selector: 'app-chat-direct-messages',
  standalone: true,
  imports: [QuillModule, NgStyle, NgClass, ReactiveFormsModule, AsyncPipe, DirectMessageComponent],
  templateUrl: './chat-direct-messages.component.html',
  styleUrl: './chat-direct-messages.component.scss'
})


export class ChatDirectMessagesComponent implements OnInit {
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  createDirectMessageService = inject(CreateDirectMessageService);
  activatedRoute = inject(ActivatedRoute);
  matDialog = inject(MatDialog);
  userId: string | null = '';
  inputValue: string | null = '';
  filteredInpuvalueWithRegex: number | undefined;
  keyEnterWasPressed: boolean = false;
  addMessageForm = new FormGroup({
    inputfieldQuillEditor: new FormControl('', Validators.required)
  })


  ngOnInit(): void {
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
      // this.createUserService.updateUserHaveAtLeastOneMessageService(this.userId, true);
      this.addMessageForm.reset();
    }
  }


  sendDirectMessageIfPressOnEnterKey(event: KeyboardEvent): void {
    this.inputValue = this.addMessageForm.controls.inputfieldQuillEditor.value;
    const inputValueWithoutHTMLTags = this.inputValue?.replace(/<[^>]*>/g, ''); // The regular expression removes the HTML tags from the string that come from the Quill Editor
    this.filteredInpuvalueWithRegex = this.inputValue?.replace(/(<([^>]+)>)/ig, '').length; // The regular expression checks whether the HTML tags from the Quill Editor are empty. If so, empty messages will be prevented from being sent. 
    if (event?.key == 'Enter' && this.filteredInpuvalueWithRegex && this.filteredInpuvalueWithRegex > 0) {
      this.createDirectMessageService.createDirectMessageService(this.authService.user, this.userId, inputValueWithoutHTMLTags || null);
      // this.createUserService.updateUserHaveAtLeastOneMessageService(this.userId, true);
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


  // checkIfUserHaveAlreadyMessages(): boolean {
  //   return (!this.createUserService.load && !this.createUserService.user.haveAtLeastOneMessage) ? true : false;
  // }


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
}
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CreateUserService } from '../../services/create-user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogProfileDetailViewInDirectMessagesComponent } from '../dialog-profile-detail-view-in-direct-messages/dialog-profile-detail-view-in-direct-messages.component';


@Component({
  selector: 'app-chat-direct-messages',
  standalone: true,
  imports: [QuillModule],
  templateUrl: './chat-direct-messages.component.html',
  styleUrl: './chat-direct-messages.component.scss'
})


export class ChatDirectMessagesComponent implements OnInit {
  createUserService = inject(CreateUserService);
  activatedRoute = inject(ActivatedRoute);
  matDialog = inject(MatDialog);
  userId: string | null = '';


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.createUserService.getSingelUserService(this.userId)
    })
  }


  openProfileDetailView(): void {
    this.matDialog.open(DialogProfileDetailViewInDirectMessagesComponent, { autoFocus: false });
  }


  noProfileImgExist(): boolean {
    return (!this.createUserService.user.imgUrl) ? true : false;
  }


  userIsOnline(): boolean {
    return (this.createUserService.user.isOnline) ? true : false;
  }


  contactAreLoading(): boolean {
    return (this.createUserService.loadContacts) ? true : false;
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
}

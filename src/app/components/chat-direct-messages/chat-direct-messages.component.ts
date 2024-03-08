import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CreateUserService } from '../../services/create-user.service';


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
  userId: string | null = '';


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.createUserService.getSingelUserService(this.userId)
    })
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

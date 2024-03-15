import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DirectMessage } from '../../models/direct-message';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [DatePipe, NgClass, ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})


export class MessageComponent implements OnInit {
  createDirectMessageService = inject(CreateDirectMessageService);
  authService = inject(AuthService);
  @Input() directMessage!: DirectMessage;
  @Input() directMessageId: string = '';
  @Output() getSenderTimeFromSendedMessage = new EventEmitter();
  menuMoreOptionsAreOpen: boolean = false;
  messageIsInEditMode: boolean = false;
  editMessageForm = new FormGroup({
    inputfieldEditMessage: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
    setTimeout(() => {
      this.getSenderTimeFromSendedMessage.emit(this.directMessage);
    }, 0);
  }


  noProfileImgExistInMessage(): boolean {
    return (!this.directMessage.userThatSendedMessage?.imgUrl) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.directMessage.userThatSendedMessage?.userId == this.authService.user.userId) ? true : false;
  }


  openMenuMoreOptions(): void {
    this.menuMoreOptionsAreOpen = !this.menuMoreOptionsAreOpen;
  }


  closeMenuMoreOptionIfHoverOutside(): void {
    this.menuMoreOptionsAreOpen = false;
  }


  openEditModeFromMessage(): void {
    this.messageIsInEditMode = true;
    this.menuMoreOptionsAreOpen = false;
  }


  closeEditModeFromMessage(): void {
    this.messageIsInEditMode = false;
    this.editMessageForm.reset();
  }


  editMessage() {
    this.createDirectMessageService.updateDirectMessageService(this.directMessageId, this.editMessageForm.controls.inputfieldEditMessage.value);
    this.closeEditModeFromMessage();
  }
}
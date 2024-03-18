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
  barToSelectEmojisAreOpen: boolean = false;
  imgUrls: string[] = ['assets/icons/check-emoji-icon.svg', 'assets/icons/raising-both-hands-emoji-icon.svg', 'assets/icons/nerd-emoji-icon.svg', 'assets/icons/rocket-emoji-icon.svg'];
  selectedEmojis: string[] = [];
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


  closeOpenMenusInMessageIfHoverOutside(): void {
    this.menuMoreOptionsAreOpen = false;
    this.barToSelectEmojisAreOpen = false;
  }


  openEditModeFromMessage(): void {
    this.messageIsInEditMode = true;
    this.menuMoreOptionsAreOpen = false;
    this.barToSelectEmojisAreOpen = false;
  }


  closeEditModeFromMessage(): void {
    this.messageIsInEditMode = false;
    this.editMessageForm.reset();
  }


  openBarToSelectEmojis(): void {
    this.barToSelectEmojisAreOpen = !this.barToSelectEmojisAreOpen;
    this.menuMoreOptionsAreOpen = false;
  }


  checkIfTheMessageHaveAlreadyEmojis(): void {
    if (!this.directMessage.selectedEmojis || this.directMessage.selectedEmojis.length == 0) {
      this.directMessage.selectedEmojis = [];
    }
  }


  selectEmoji(selectedEmoji: string): void {
    this.checkIfTheMessageHaveAlreadyEmojis();
    let index = this.directMessage.selectedEmojis.indexOf(selectedEmoji);
    if (index == -1) {
      this.directMessage.selectedEmojis.push(selectedEmoji);
      this.createDirectMessageService.updateDirectMessageEmojisService(this.directMessageId, this.directMessage.selectedEmojis);
    } else {
      this.directMessage.selectedEmojis.splice(index, 1);
      this.createDirectMessageService.updateDirectMessageEmojisService(this.directMessageId, this.directMessage.selectedEmojis);
    }
  }


  editMessage(): void {
    this.createDirectMessageService.updateDirectMessageService(this.directMessageId, this.editMessageForm.controls.inputfieldEditMessage.value);
    this.closeEditModeFromMessage();
  }


  deleteMessage(): void {
    this.createDirectMessageService.deleteDirectMessageService(this.directMessageId);
    this.menuMoreOptionsAreOpen = false;
  }
}
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DirectMessage } from '../../models/direct-message';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserService } from '../../services/create-user.service';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [DatePipe, NgClass, ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})


export class MessageComponent implements OnInit {
  createDirectMessageService = inject(CreateDirectMessageService);
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  @Input() directMessage!: DirectMessage;
  @Input() directMessageId: string = '';
  @Output() getSenderTimeFromSendedMessage = new EventEmitter();
  menuMoreOptionsAreOpen: boolean = false;
  messageIsInEditMode: boolean = false;
  barToSelectEmojisAreOpen: boolean = false;
  // emojiAlreadySelected: boolean = false;
  // imgUrls: string[] = ['assets/icons/check-emoji-icon.svg', 'assets/icons/raising-both-hands-emoji-icon.svg', 'assets/icons/nerd-emoji-icon.svg', 'assets/icons/rocket-emoji-icon.svg'];
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


  // init() {
  //   if (!this.directMessage.checkEmojiAmount) {
  //     this.directMessage.checkEmojiAmount = 0;
  //   }
  //   if (!this.directMessage.raisingBothHandsEmojiAmount) {
  //     this.directMessage.raisingBothHandsEmojiAmount = 0;
  //   }
  //   if (!this.directMessage.nerdEmojiAmount) {
  //     this.directMessage.nerdEmojiAmount = 0;
  //   }
  //   if (!this.directMessage.rocketEmojiAmount) {
  //     this.directMessage.rocketEmojiAmount = 0;
  //   }
  //   if (!this.directMessage.userEmojis) {
  //     this.directMessage.userEmojis = {};
  //   }
  // }


  selectEmoji(emojiUrl: string) {
    // this.init();
    // if (emojiUrl == 'assets/icons/check-emoji-icon.svg') {
    //   this.directMessage.checkEmojiAmount += 1;
    //   this.createDirectMessageService.updateCheckEmojiAmountService(this.directMessageId, this.directMessage.checkEmojiAmount, this.directMessage, this.authService.user.userId, 'assets/icons/check-emoji-icon.svg');
    // } else if (emojiUrl == 'assets/icons/raising-both-hands-emoji-icon.svg') {
    //   this.directMessage.raisingBothHandsEmojiAmount += 1;
    //   this.createDirectMessageService.updateRaisingBothHandsEmojiAmountService(this.directMessageId, this.directMessage.raisingBothHandsEmojiAmount);
    // } else if (emojiUrl == 'assets/icons/nerd-emoji-icon.svg') {
    //   this.directMessage.nerdEmojiAmount += 1;
    //   this.createDirectMessageService.updateNerdEmojiAmountService(this.directMessageId, this.directMessage.nerdEmojiAmount);
    // } else if (emojiUrl == 'assets/icons/rocket-emoji-icon.svg') {
    //   this.directMessage.rocketEmojiAmount += 1;
    //   this.createDirectMessageService.updateRocketEmojiAmountService(this.directMessageId, this.directMessage.rocketEmojiAmount);
    // }
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
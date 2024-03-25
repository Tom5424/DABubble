import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DirectMessage } from '../../models/direct-message';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserService } from '../../services/create-user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [DatePipe, NgClass, ReactiveFormsModule, MatTooltipModule, RouterLink],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})


export class MessageComponent implements OnInit {
  createDirectMessageService = inject(CreateDirectMessageService);
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  @Input() directMessage!: DirectMessage;
  @Input() directMessageId: string = '';
  @Output() getSenderTimeFromSendedMessage = new EventEmitter();
  menuMoreOptionsAreOpen: boolean = false;
  messageIsInEditMode: boolean = false;
  barToSelectEmojisAreOpen: boolean = false;
  userId: string | null = '';
  editMessageForm = new FormGroup({
    inputfieldEditMessage: new FormControl('', Validators.required),
  })


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
    });
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


  initAddedEmojiFieldInDirectMessage(): void {
    if (!this.directMessage.addedEmojis) {
      this.directMessage.addedEmojis = [
        { emojiUrl: '', emojiAmount: 0, usersIdWhoHaveUsedTheEmoji: [], usersNameWhoHaveUsedTheEmoji: [] }
      ];
    }
  }


  selectEmoji(emojiUrl: string) {
    this.initAddedEmojiFieldInDirectMessage();
    this.createDirectMessageService.updateEmojisService(this.directMessageId, this.authService.user.userId, this.authService.user.name, emojiUrl, this.directMessage);
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
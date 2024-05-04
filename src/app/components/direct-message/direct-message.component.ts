import { Component, Input, OnInit, inject } from '@angular/core';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DatePipe, NgClass, NgStyle } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DirectMessage } from '../../models/direct-message';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateUserService } from '../../services/create-user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CreateThreadMessageInDirectMessageService } from '../../services/create-thread-message-in-direct-message.service';
import { ThreadMessage } from '../../models/thread-message';


@Component({
  selector: 'app-direct-message',
  standalone: true,
  imports: [DatePipe, NgClass, NgStyle, ReactiveFormsModule, RouterLink, PickerComponent],
  templateUrl: './direct-message.component.html',
  styleUrls: ['./direct-message.component.scss', './direct-message.component.media.scss']
})


export class DirectMessageComponent implements OnInit {
  createDirectMessageService = inject(CreateDirectMessageService);
  createThreadMessageInDirectMessageService = inject(CreateThreadMessageInDirectMessageService);
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  matDialog = inject(MatDialog);
  @Input() directMessage!: DirectMessage;
  @Input() directMessageId: string = '';
  messageAmountFromThreadDirectMessages: number = 0;
  latestMessageInThreadDirectMessage: number = 0;
  menuMoreOptionsAreOpen: boolean = false;
  messageIsInEditMode: boolean = false;
  barToSelectEmojisAreOpen: boolean = false;
  emojiPickerIsDisplayed: boolean = false;
  inputValue: string | null = '';
  emojiUrl: string = '';
  userId: string | null = '';
  editMessageForm = new FormGroup({
    textareaEditMessage: new FormControl(this.inputValue, Validators.required),
  })


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.userId = params.get('id');
      this.getAllMessagesFromThreadDirectMessage();
    });
  }


  getAllMessagesFromThreadDirectMessage(): void {
    this.createThreadMessageInDirectMessageService.getThreadMessagesService(this.directMessageId).
      subscribe((threadMessages) => {
        this.messageAmountFromThreadDirectMessages = threadMessages.length;
        this.getLatestMessageFromThreadDirectMessage(threadMessages);
      })
  }


  getLatestMessageFromThreadDirectMessage(threadMessages: ThreadMessage[]): void {
    if (threadMessages.length > 0) {
      const latestMessage = threadMessages[threadMessages.length - 1];
      this.latestMessageInThreadDirectMessage = latestMessage.senderTime;
    }
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


  closeEmojiPickerIfClickOutside(): void {
    this.emojiPickerIsDisplayed = false;
  }


  tootgleEmojiPicker() {
    this.emojiPickerIsDisplayed = !this.emojiPickerIsDisplayed;
  }


  selectEmojiInEmojiPicker(event: EmojiEvent) {
    this.inputValue = this.editMessageForm.controls.textareaEditMessage.value;
    this.inputValue += event.emoji.native ? event.emoji.native : '';
    this.editMessageForm.patchValue({
      textareaEditMessage: this.inputValue,
    });
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


  displayTooltipAddedEmoji(emojiUrl: string): void {
    this.emojiUrl = emojiUrl;
  }


  hideTooltipAddedEmoji(): void {
    this.emojiUrl = '';
  }


  emojiUrlMatchesWithEmojiUrlFromTooltip(emojiUrl: string): boolean {
    return (emojiUrl == this.emojiUrl) ? true : false;
  }


  openImageDetailView(uploadedImage: string): void {
    this.matDialog.open(DialogUploadedImgFullViewComponent, { data: { uploadedImage: uploadedImage } });
  }


  editMessage(): void {
    this.inputValue = this.editMessageForm.controls.textareaEditMessage.value;
    this.createDirectMessageService.updateDirectMessageService(this.directMessageId, this.inputValue);
    this.closeEditModeFromMessage();
  }


  deleteMessage(): void {
    this.createDirectMessageService.deleteDirectMessageService(this.directMessageId);
    this.menuMoreOptionsAreOpen = false;
  }
}
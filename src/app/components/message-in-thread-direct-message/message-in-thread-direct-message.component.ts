import { Component, Input, inject } from '@angular/core';
import { ThreadMessage } from '../../models/thread-message';
import { AsyncPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CreateThreadMessageService } from '../../services/create-thread-message.service';


@Component({
  selector: 'app-message-in-thread-direct-message',
  standalone: true,
  imports: [AsyncPipe, DatePipe, NgClass, NgStyle, ReactiveFormsModule, PickerComponent],
  templateUrl: './message-in-thread-direct-message.component.html',
  styleUrl: './message-in-thread-direct-message.component.scss'
})


export class MessageInThreadDirectMessageComponent {
  authService = inject(AuthService);
  createThreadMessageService = inject(CreateThreadMessageService);
  matDialog = inject(MatDialog);
  inputValue: string | null = '';
  emojiUrl: string = '';
  @Input() threadMessageId: string = '';
  @Input() directMessageId: string | null = '';
  @Input() threadMessage!: ThreadMessage;
  barToSelectEmojisAreOpen: boolean = false;
  menuMoreOptionsAreOpen: boolean = false;
  messageIsInEditMode: boolean = false;
  emojiPickerIsDisplayed: boolean = false;
  editMessageForm = new FormGroup({
    textareaEditMessage: new FormControl(this.inputValue, Validators.required),
  })


  closeOpenMenusInMessageIfHoverOutside(): void {
    this.barToSelectEmojisAreOpen = false;
    this.menuMoreOptionsAreOpen = false;
  }


  openBarToSelectEmojis(): void {
    this.barToSelectEmojisAreOpen = !this.barToSelectEmojisAreOpen;
    this.menuMoreOptionsAreOpen = false;
  }


  openMenuMoreOptions(): void {
    this.menuMoreOptionsAreOpen = !this.menuMoreOptionsAreOpen;
  }


  openEditModeFromMessage(): void {
    this.messageIsInEditMode = true;
    this.menuMoreOptionsAreOpen = false;
    this.barToSelectEmojisAreOpen = false;
  }


  tootgleEmojiPicker() {
    this.emojiPickerIsDisplayed = !this.emojiPickerIsDisplayed;
  }


  editMessage(): void {
    this.inputValue = this.editMessageForm.controls.textareaEditMessage.value;
    this.createThreadMessageService.updateThreadMessageService(this.directMessageId, this.threadMessageId, this.inputValue);
    this.closeEditModeFromMessage();
  }


  deleteMessage(): void {
    this.createThreadMessageService.deleteThreadMessageService(this.directMessageId, this.threadMessageId);
    this.menuMoreOptionsAreOpen = false;
  }


  closeEditModeFromMessage(): void {
    this.messageIsInEditMode = false;
    this.editMessageForm.reset();
  }


  closeEmojiPickerIfClickOutside(): void {
    this.emojiPickerIsDisplayed = false;
  }


  selectEmojiInEmojiPicker(event: EmojiEvent) {
    this.inputValue = this.editMessageForm.controls.textareaEditMessage.value;
    this.inputValue += event.emoji.native ? event.emoji.native : '';
    this.editMessageForm.patchValue({
      textareaEditMessage: this.inputValue,
    });
  }


  openImageDetailView(uploadedImage: string): void {
    this.matDialog.open(DialogUploadedImgFullViewComponent, { data: { uploadedImage: uploadedImage } });
  }


  initAddedEmojiFieldInThreadMessage(): void {
    if (!this.threadMessage.addedEmojis) {
      this.threadMessage.addedEmojis = [
        { emojiUrl: '', emojiAmount: 0, usersIdWhoHaveUsedTheEmoji: [], usersNameWhoHaveUsedTheEmoji: [] }
      ];
    }
  }


  selectEmoji(emojiUrl: string) {
    this.initAddedEmojiFieldInThreadMessage();
    this.createThreadMessageService.updateEmojisService(this.directMessageId, this.threadMessageId, this.authService.user.userId, this.authService.user.name, emojiUrl, this.threadMessage);
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


  noProfileImgExistInMessage(): boolean {
    return (!this.threadMessage.userThatSendedMessage?.imgUrl) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.threadMessage.userThatSendedMessage?.userId == this.authService.user.userId) ? true : false;
  }
}

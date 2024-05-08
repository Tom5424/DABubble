import { AsyncPipe, DatePipe, NgClass, NgStyle } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ThreadMessage } from '../../models/thread-message';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { CreateThreadMessageInChannelMessageService } from '../../services/create-thread-message-in-channel-message.service';


@Component({
  selector: 'app-message-in-thread-channel-message',
  standalone: true,
  imports: [NgClass, NgStyle, AsyncPipe, DatePipe, ReactiveFormsModule, PickerComponent],
  templateUrl: './message-in-thread-channel-message.component.html',
  styleUrls: ['./message-in-thread-channel-message.component.scss', './message-in-thread-channel-message.component.media.scss']
})


export class MessageInThreadChannelMessageComponent {
  createThreadMessageInChannelMessageService = inject(CreateThreadMessageInChannelMessageService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  @Input() threadMessageId: string = '';
  @Input() channelMessageId: string | null = '';
  @Input() threadMessage!: ThreadMessage;
  inputValue: string | null = '';
  emojiUrl: string = '';
  emojiPickerIsDisplayed: boolean = false;
  barToSelectEmojisAreOpen: boolean = false;
  menuMoreOptionsAreOpen: boolean = false;
  messageIsInEditMode: boolean = false;
  editMessageForm = new FormGroup({
    textareaEditMessage: new FormControl(this.inputValue, Validators.required),
  })


  closeOpenMenusInMessageIfHoverOutside(): void {
    this.barToSelectEmojisAreOpen = false;
    this.menuMoreOptionsAreOpen = false;
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


  tootgleEmojiPicker() {
    this.emojiPickerIsDisplayed = !this.emojiPickerIsDisplayed;
  }


  openBarToSelectEmojis(): void {
    this.barToSelectEmojisAreOpen = !this.barToSelectEmojisAreOpen;
    this.menuMoreOptionsAreOpen = false;
  }


  openMenuMoreOptions(): void {
    this.menuMoreOptionsAreOpen = !this.menuMoreOptionsAreOpen;
    this.barToSelectEmojisAreOpen = false;
  }


  openEditModeFromMessage(): void {
    this.messageIsInEditMode = true;
    this.menuMoreOptionsAreOpen = false;
    this.barToSelectEmojisAreOpen = false;
  }


  editMessage(): void {
    this.inputValue = this.editMessageForm.controls.textareaEditMessage.value;
    this.createThreadMessageInChannelMessageService.updateThreadMessageService(this.channelMessageId, this.threadMessageId, this.inputValue);
    this.closeEditModeFromMessage();
  }


  deleteMessage(): void {
    this.createThreadMessageInChannelMessageService.deleteThreadMessageService(this.channelMessageId, this.threadMessageId);
    this.menuMoreOptionsAreOpen = false;
  }


  closeEditModeFromMessage(): void {
    this.messageIsInEditMode = false;
    this.editMessageForm.reset();
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
    this.createThreadMessageInChannelMessageService.updateEmojisService(this.channelMessageId, this.threadMessageId, this.authService.user.userId, this.authService.user.name, emojiUrl, this.threadMessage);
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


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.threadMessage.userThatSendedMessage?.userId == this.authService.user.userId) ? true : false;
  }


  noProfileImgExistInMessage(): boolean {
    return (!this.threadMessage.userThatSendedMessage?.imgUrl) ? true : false;
  }
}

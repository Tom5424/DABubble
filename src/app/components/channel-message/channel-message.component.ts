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
import { CreateChannelMessageService } from '../../services/create-channel-message.service';
import { ChannelMessage } from '../../models/channel-message';



@Component({
  selector: 'app-channel-message',
  standalone: true,
  imports: [DatePipe, NgClass, NgStyle, ReactiveFormsModule, RouterLink, PickerComponent],
  templateUrl: './channel-message.component.html',
  styleUrl: './channel-message.component.scss'
})


export class ChannelMessageComponent {
  createChannelMessageService = inject(CreateChannelMessageService);
  // createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);
  matDialog = inject(MatDialog);
  @Input() channelMessage!: ChannelMessage;
  @Input() channelMessageId: string = '';
  menuMoreOptionsAreOpen: boolean = false;
  messageIsInEditMode: boolean = false;
  barToSelectEmojisAreOpen: boolean = false;
  emojiPickerIsDisplayed: boolean = false;
  inputValue: string | null = '';
  emojiUrl: string = '';
  channelId: string | null = '';
  editMessageForm = new FormGroup({
    textareaEditMessage: new FormControl(this.inputValue, Validators.required),
  })


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.channelId = params.get('id');
    });
  }


  noProfileImgExistInMessage(): boolean {
    return (!this.channelMessage.userThatSendedMessage?.imgUrl) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.channelMessage.userThatSendedMessage?.userId == this.authService.user.userId) ? true : false;
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


  initAddedEmojiFieldInChannelMessage(): void {
    if (!this.channelMessage.addedEmojis) {
      this.channelMessage.addedEmojis = [
        { emojiUrl: '', emojiAmount: 0, usersIdWhoHaveUsedTheEmoji: [], usersNameWhoHaveUsedTheEmoji: [] }
      ];
    }
  }


  selectEmoji(emojiUrl: string) {
    this.initAddedEmojiFieldInChannelMessage();
    this.createChannelMessageService.updateEmojisService(this.channelMessageId, this.authService.user.userId, this.authService.user.name, emojiUrl, this.channelMessage);
  }


  displayTooltiAddedEmojip(emojiUrl: string): void {
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
    this.createChannelMessageService.updateChannelMessageService(this.channelMessageId, this.inputValue);
    this.closeEditModeFromMessage();
  }


  deleteMessage(): void {
    this.createChannelMessageService.deleteChannelMessageService(this.channelMessageId);
    this.menuMoreOptionsAreOpen = false;
  }
}

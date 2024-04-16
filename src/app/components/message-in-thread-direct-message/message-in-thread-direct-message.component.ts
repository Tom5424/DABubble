import { Component, Input, inject } from '@angular/core';
import { ThreadMessage } from '../../models/thread-message';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-message-in-thread-direct-message',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './message-in-thread-direct-message.component.html',
  styleUrl: './message-in-thread-direct-message.component.scss'
})


export class MessageInThreadDirectMessageComponent {
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  @Input() threadMessageId: string = '';
  @Input() threadMessage!: ThreadMessage;
  barToSelectEmojisAreOpen: boolean = false;
  menuMoreOptionsAreOpen: boolean = false;


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


  openImageDetailView(uploadedImage: string): void {
    this.matDialog.open(DialogUploadedImgFullViewComponent, { data: { uploadedImage: uploadedImage } });
  }


  noProfileImgExistInMessage(): boolean {
    return (!this.threadMessage.userThatSendedMessage?.imgUrl) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.threadMessage.userThatSendedMessage?.userId == this.authService.user.userId) ? true : false;
  }
}

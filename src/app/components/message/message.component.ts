import { Component, Input, inject } from '@angular/core';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DirectMessage } from '../../models/direct-message';


@Component({
  selector: 'app-message',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})


export class MessageComponent {
  createDirectMessageService = inject(CreateDirectMessageService);
  authService = inject(AuthService);
  @Input() directMessage!: DirectMessage;


  noProfileImgExistInMessage(): boolean {
    return (!this.directMessage.userThatSendedMessage?.imgUrl) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.directMessage.userThatSendedMessage?.userId == this.authService.user.userId) ? true : false;
  }
}
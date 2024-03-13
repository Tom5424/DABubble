import { Component, Input, inject } from '@angular/core';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { DatePipe, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { DirectMessage } from '../../models/direct-message';


@Component({
  selector: 'app-direct-message',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './direct-message.component.html',
  styleUrl: './direct-message.component.scss'
})


export class DirectMessageComponent {
  createDirectMessageService = inject(CreateDirectMessageService);
  authService = inject(AuthService);
  @Input() directMessage!: DirectMessage;


  noProfileImgExistInChat(user: User | null): boolean {
    return (!user?.imgUrl) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(): boolean {
    return (this.directMessage.userThatSendedMessage?.userId == this.authService.user.userId) ? true : false;
  }


  a() {
    return this.directMessage.userThatSendedMessage?.userId == this.authService.user.userId
  }
}

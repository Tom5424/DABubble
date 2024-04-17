import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CreateDirectMessageService } from '../../services/create-direct-message.service';
import { CreateChannelMessageService } from '../../services/create-channel-message.service';
import { User } from '../../models/user';
import { Channel } from '../../models/channel';


@Component({
  selector: 'app-user-feedback-message',
  standalone: true,
  imports: [],
  templateUrl: './user-feedback-message.component.html',
  styleUrl: './user-feedback-message.component.scss'
})


export class UserFeedbackMessageComponent implements OnChanges {
  authService = inject(AuthService);
  createDirectMessageService = inject(CreateDirectMessageService);
  createChannelMessageService = inject(CreateChannelMessageService);
  @Input() selectedUsers!: User[];
  @Input() selectedChannels!: Channel[];


  ngOnChanges(changes: SimpleChanges): void {
    this.selectedUsers = changes['selectedUsers'].previousValue;
    this.selectedChannels = changes['selectedChannels'].previousValue;
  }
}

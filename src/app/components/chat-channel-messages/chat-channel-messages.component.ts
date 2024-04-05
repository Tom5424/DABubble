import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat-channel-messages',
  standalone: true,
  imports: [],
  templateUrl: './chat-channel-messages.component.html',
  styleUrl: './chat-channel-messages.component.scss'
})


export class ChatChannelMessagesComponent {
  router = inject(Router);
}

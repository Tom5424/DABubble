import { Component } from '@angular/core';
import { QuillModule } from 'ngx-quill';


@Component({
  selector: 'app-chat-direct-messages',
  standalone: true,
  imports: [QuillModule],
  templateUrl: './chat-direct-messages.component.html',
  styleUrl: './chat-direct-messages.component.scss'
})


export class ChatDirectMessagesComponent {

}

import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-user-feedback-message',
  standalone: true,
  imports: [],
  templateUrl: './user-feedback-message.component.html',
  styleUrl: './user-feedback-message.component.scss'
})


export class UserFeedbackMessageComponent {


  constructor(public authService: AuthService) {

  }

}

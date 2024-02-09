import { Component } from '@angular/core';
import { FormDataService } from '../../services/form-data.service';


@Component({
  selector: 'app-user-feedback-message',
  standalone: true,
  imports: [],
  templateUrl: './user-feedback-message.component.html',
  styleUrl: './user-feedback-message.component.scss'
})


export class UserFeedbackMessageComponent {


  constructor(public formDataService: FormDataService) {

  }

}

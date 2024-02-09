import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FormDataService } from '../../services/form-data.service';


@Component({
  selector: 'app-avatar-picker',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './avatar-picker.component.html',
  styleUrl: './avatar-picker.component.scss'
})


export class AvatarPickerComponent implements OnInit {


  constructor(public formDataService: FormDataService) {

  }



  ngOnInit(): void {
    this.formDataService.loadFormDataSignupForm();
  }


  test() {

  }
}

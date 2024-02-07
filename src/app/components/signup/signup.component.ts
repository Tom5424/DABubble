import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FooterComponent, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})


export class SignupComponent {

}

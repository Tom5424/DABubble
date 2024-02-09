import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [HeaderComponent, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})


export class PrivacyPolicyComponent {

}

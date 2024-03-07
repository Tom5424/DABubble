import { Component } from '@angular/core';
import { HeaderMainViewComponent } from '../header-main-view/header-main-view.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-main-view',
  standalone: true,
  imports: [HeaderMainViewComponent, SidebarComponent, RouterOutlet],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss'
})


export class MainViewComponent {

}

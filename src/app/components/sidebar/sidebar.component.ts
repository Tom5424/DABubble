import { NgClass } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})


export class SidebarComponent {
  channelsAreCollapsed: boolean = false;
  contactsAreCollapsed: boolean = false;


  foldInChannels(): void {
    this.channelsAreCollapsed = !this.channelsAreCollapsed;
  }


  foldInContacts(): void {
    this.contactsAreCollapsed = !this.contactsAreCollapsed;
  }
}

import { Component } from '@angular/core';
import { ChannelsInSidebarComponent } from '../channels-in-sidebar/channels-in-sidebar.component';
import { ContactsInSidebarComponent } from '../contacts-in-sidebar/contacts-in-sidebar.component';
import { InputfieldInSidebarMobileViewComponent } from '../inputfield-in-sidebar-mobile-view/inputfield-in-sidebar-mobile-view.component';
import { RouterLink } from '@angular/router';
import { ButtonCreateNewMessageMobileViewComponent } from '../button-create-new-message-mobile-view/button-create-new-message-mobile-view.component';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [InputfieldInSidebarMobileViewComponent, ChannelsInSidebarComponent, ContactsInSidebarComponent, ButtonCreateNewMessageMobileViewComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './sidebar.component.media.scss']
})


export class SidebarComponent {

}
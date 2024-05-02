import { Component } from '@angular/core';
import { ChannelsInSidebarComponent } from '../channels-in-sidebar/channels-in-sidebar.component';
import { ContactsInSidebarComponent } from '../contacts-in-sidebar/contacts-in-sidebar.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, ChannelsInSidebarComponent, ContactsInSidebarComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss', './sidebar.component.media.scss']
})


export class SidebarComponent {

}
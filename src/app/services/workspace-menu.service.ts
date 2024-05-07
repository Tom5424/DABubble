import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})


export class WorkspaceMenuService {
  sidebarIsHidden: boolean = false;
  inNewMessageMobileView: boolean = false;
  inChatDirectMessagesMobileView: boolean = false;
  inThreadDirectMessagesMobileView: boolean = false;
  inChatChannelMessagesMobileView: boolean = false;
  inThreadChannelMessagesMobileView: boolean = false;


  toggleSidebarService(): void {
    this.sidebarIsHidden = !this.sidebarIsHidden;
  }
}
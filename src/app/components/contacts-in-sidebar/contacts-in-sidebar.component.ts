import { AsyncPipe, NgClass } from '@angular/common';
import { Component, HostListener, OnInit, inject } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../models/user';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { WorkspaceMenuService } from '../../services/workspace-menu.service';


@Component({
  selector: 'app-contacts-in-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './contacts-in-sidebar.component.html',
  styleUrls: ['./contacts-in-sidebar.component.scss', './contacts-in-sidebar.component.media.scss']
})


export class ContactsInSidebarComponent implements OnInit {
  workspaceMenuService = inject(WorkspaceMenuService);
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  contactListAreCollapsed: boolean = false;
  allUser: User[] = [];
  windowInnerWidth: number = 0;


  ngOnInit(): void {
    this.getWindowSize()
    this.createUserService.getAllUserService();
  }


  getWindowSize(): void {
    this.windowInnerWidth = window.innerWidth;
  }


  foldInContactList(): void {
    this.contactListAreCollapsed = !this.contactListAreCollapsed;
  }


  noProfileImgExist(user: User): boolean {
    return (!user.imgUrl) ? true : false;
  }


  userIsOnline(user: User): boolean {
    return (user.isOnline) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(user: User): boolean {
    return (user.userId == this.authService.user.userId) ? true : false;
  }


  contactsAreLoading(): boolean {
    return (this.createUserService.loadContacts) ? true : false;
  }


  @HostListener('window:resize', ['$event'])
  checkWindowSize() {
    this.windowInnerWidth = window.innerWidth;
  }


  selectContactInMobileView(): void {
    if (this.windowInnerWidth <= 1000) {
      this.workspaceMenuService.sidebarIsHidden = true;
    }
  }
}

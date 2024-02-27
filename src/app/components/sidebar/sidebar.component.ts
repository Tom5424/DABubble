import { AsyncPipe, NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})


export class SidebarComponent implements OnInit {
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  channelListAreCollapsed: boolean = false;
  contactListAreCollapsed: boolean = false;


  ngOnInit(): void {
    this.createUserService.checkIfContactsExistingInDatabaseService();
    this.createUserService.getAllUserService();
    this.authService.getDataFromLoggedInUserService();
  }


  foldInChannelList(): void {
    this.channelListAreCollapsed = !this.channelListAreCollapsed;
  }


  foldInContactList(): void {
    this.contactListAreCollapsed = !this.contactListAreCollapsed;
  }


  noProfileImgExist(user: User): boolean {
    return (!user.imgUrl) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(user: User): boolean {
    return user.userId == this.authService.user.userId;
  }


  checkIfContactsExistingInDatabase(): boolean {
    return this.createUserService.noContactsExistingInDatabase;
  }
}
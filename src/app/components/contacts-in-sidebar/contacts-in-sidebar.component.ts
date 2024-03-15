import { NgClass } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../models/user';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-contacts-in-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './contacts-in-sidebar.component.html',
  styleUrl: './contacts-in-sidebar.component.scss'
})


export class ContactsInSidebarComponent implements OnInit {
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  contactListAreCollapsed: boolean = false;
  allUser: User[] = [];


  ngOnInit(): void {
    this.createUserService.checkIfUserExistingInDatabaseService();
    this.getAllUsers();
  }


  getAllUsers(): void {
    this.createUserService.getAllUserService()
      .subscribe((userData) => {
        this.allUser = userData;
      })
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
    return user.userId == this.authService.user.userId;
  }


  checkIfContactsExistingInDatabase(): boolean {
    return (this.createUserService.noContactsExistingInDatabase) ? true : false;
  }


  contactsAreLoading(): boolean {
    return (this.createUserService.loadContacts) ? true : false;
  }
}
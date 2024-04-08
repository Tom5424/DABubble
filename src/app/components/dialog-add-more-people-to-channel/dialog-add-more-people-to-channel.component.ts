import { NgClass } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dialog-add-more-people-to-channel',
  standalone: true,
  imports: [MatDialogClose, NgClass],
  templateUrl: './dialog-add-more-people-to-channel.component.html',
  styleUrl: './dialog-add-more-people-to-channel.component.scss'
})


export class DialogAddMorePeopleToChannelComponent {
  createUserService = inject(CreateUserService);
  authService = inject(AuthService);
  allUsers: User[] = [];
  menuUserSelectionIsOpen: boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.getAllUsers();
  }


  getAllUsers(): void {
    this.createUserService.getAllUserService()
      .subscribe((userData) => {
        this.allUsers = userData;
      })
    // this.getInputvalue();
  }


  noProfileImgExist(user: User): boolean {
    return (!user.imgUrl) ? true : false;
  }


  userIsOnline(user: User): boolean {
    return (user.isOnline) ? true : false;
  }


  userIdMatchesWithIdFromLoggedinUser(userId: string): boolean {
    return (userId !== this.authService.auth.currentUser?.uid) ? true : false;
  }


  closeUserMenuSelectionIfClickOutside(): void {
    this.menuUserSelectionIsOpen = false;
  }


  openMenuUserSelection(): void {
    this.menuUserSelectionIsOpen = true;
  }
}

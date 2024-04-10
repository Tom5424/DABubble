import { AsyncPipe, NgClass } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { CreateUserService } from '../../services/create-user.service';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateChannelService } from '../../services/create-channel.service';
import { Observable, map, startWith } from 'rxjs';


@Component({
  selector: 'app-dialog-add-more-people-to-channel',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './dialog-add-more-people-to-channel.component.html',
  styleUrl: './dialog-add-more-people-to-channel.component.scss'
})


export class DialogAddMorePeopleToChannelComponent {
  createUserService = inject(CreateUserService);
  createChannelService = inject(CreateChannelService);
  authService = inject(AuthService);
  matDialog = inject(MatDialog);
  filteredUsers!: Observable<User[]>;
  allUsers: User[] = [];
  addedUsersToTheChannel: User[] = [];
  menuUserSelectionIsOpen: boolean = false;
  addMorePeopleForm = new FormGroup({
    inputFieldAddMorePeople: new FormControl('', Validators.required),
  })


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.getAllUsers();
  }


  getAllUsers(): void {
    this.createUserService.getAllUserService()
      .subscribe((userData) => {
        this.allUsers = userData;
        this.getInputvalue();
      })
  }


  getInputvalue(): void {
    this.filteredUsers = this.addMorePeopleForm.controls.inputFieldAddMorePeople.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterUserBasedOnInputvalue(value || ''))
    );
  }


  filterUserBasedOnInputvalue(value: string): User[] {
    const searchValue = value.toLowerCase();
    return this.allUsers.filter((user) => user.name?.toLowerCase().startsWith(searchValue));
  }


  addMoreMembersToTheChannel() {
    this.createChannelService.updateChannelMembersService(this.data.channelId, this.addedUsersToTheChannel);
    this.addMorePeopleForm.reset();
    this.matDialog.closeAll();
  }


  isAlreadyChannelMember(userId: string): boolean {
    return this.data.channelMembers.find((channelMember: User) => channelMember.userId == userId);
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


  noUserIsSelected(): boolean {
    return (this.addedUsersToTheChannel.length > 0) ? true : false;
  }


  addUserToChannel(user: User): void {
    const index = this.addedUsersToTheChannel.indexOf(user);
    if (index == -1) {
      this.addedUsersToTheChannel.push(user);
    } else {
      this.addedUsersToTheChannel.splice(index, 1)
    }
    this.menuUserSelectionIsOpen = false;
    this.addMorePeopleForm.controls.inputFieldAddMorePeople.reset();
  }


  removeSelectedUser(index: number) {
    this.addedUsersToTheChannel.splice(index, 1);
  }


  moreThanTwoUsersSelected(): boolean {
    return (this.addedUsersToTheChannel.length > 2) ? true : false;
  }


  userIsSelected(user: User): boolean {
    return this.addedUsersToTheChannel.find((existingUser) => existingUser.userId == user.userId) ? true : false;
  }


  closeUserMenuSelectionIfClickOutside(): void {
    this.menuUserSelectionIsOpen = false;
  }


  openMenuUserSelection(): void {
    this.menuUserSelectionIsOpen = true;
  }
}

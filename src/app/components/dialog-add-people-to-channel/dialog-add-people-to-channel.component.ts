import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { CreateChannelService } from '../../services/create-channel.service';
import { CreateUserService } from '../../services/create-user.service';
import { Observable, map, startWith } from 'rxjs';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dialog-add-people-to-channel',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './dialog-add-people-to-channel.component.html',
  styleUrl: './dialog-add-people-to-channel.component.scss'
})


export class DialogAddPeopleToChannelComponent {
  authService = inject(AuthService);
  createChannelService = inject(CreateChannelService);
  createUserService = inject(CreateUserService);
  matDialog = inject(MatDialog);
  inputFieldIsDisplayed: boolean = false;
  menuUserSelectionIsOpen: boolean = false;
  addedUsersToTheChannel: User[] = [];
  allUsers: User[] = [];
  filteredUsers!: Observable<User[]>;
  addPeopleForm = new FormGroup({
    radioAddPeople: new FormControl('', Validators.required),
    inputFieldAddPeople: new FormControl(''),
  })


  constructor(@Inject(MAT_DIALOG_DATA) public data: { channelData: any }) {
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
    this.filteredUsers = this.addPeopleForm.controls.inputFieldAddPeople.valueChanges.pipe(
      startWith(''),
      map((value) => this.filterUserBasedOnInputvalue(value || ''))
    );
  }


  filterUserBasedOnInputvalue(value: string): User[] {
    const searchValue = value.toLowerCase();
    return this.allUsers.filter((user) => user.name?.toLowerCase().includes(searchValue));
  }


  createChannel(): void {
    if (this.addPeopleForm.controls.radioAddPeople.value == 'radioAddAllPeople') {
      this.addAllUsersToChannel();
    } else {
      this.addSpecificUsersToChannel();
    }
  }


  addAllUsersToChannel(): void {
    this.createChannelService.createChannelService(this.data.channelData, this.allUsers, this.authService.user.name);
    this.matDialog.closeAll();
  }


  addSpecificUsersToChannel(): void {
    this.createChannelService.createChannelService(this.data.channelData, this.addedUsersToTheChannel, this.authService.user.name);
    this.matDialog.closeAll();
  }


  userIdMatchesWithIdFromLoggedinUser(userId: string): boolean {
    return (userId !== this.authService.auth.currentUser?.uid) ? true : false;
  }


  showInputfieldToAddSpecificMembersToChannel(): void {
    this.addPeopleForm.controls.radioAddPeople.reset();
    this.inputFieldIsDisplayed = true;
  }


  hideInputfieldToAddSpecificMembersToChannel(): void {
    this.addPeopleForm.controls.inputFieldAddPeople.reset();
    this.addedUsersToTheChannel = [];
    this.inputFieldIsDisplayed = false;
  }


  openMenuUserSelection(): void {
    this.menuUserSelectionIsOpen = true;
  }


  closeUserMenuSelectionIfClickOutside(): void {
    this.menuUserSelectionIsOpen = false;
  }


  noProfileImgExist(user: User): boolean {
    return (!user.imgUrl) ? true : false;
  }


  userIsOnline(user: User): boolean {
    return (user.isOnline) ? true : false;
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
    this.addPeopleForm.controls.inputFieldAddPeople.reset();
  }


  userIsSelected(user: User): boolean {
    return this.addedUsersToTheChannel.find((existingUser) => existingUser.userId == user.userId) ? true : false;
  }


  removeSelectedUser(index: number) {
    this.addedUsersToTheChannel.splice(index, 1);
  }


  moreThanTwoUsersSelected(): boolean {
    return (this.addedUsersToTheChannel.length > 2) ? true : false;
  }
} 
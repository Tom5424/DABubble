import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AsyncPipe, NgClass } from '@angular/common';
import { CreateChannelService } from '../../services/create-channel.service';
import { CreateUserService } from '../../services/create-user.service';
import { take } from 'rxjs';
import { User } from '../../models/user';


@Component({
  selector: 'app-dialog-add-people-to-channel',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './dialog-add-people-to-channel.component.html',
  styleUrl: './dialog-add-people-to-channel.component.scss'
})


export class DialogAddPeopleToChannelComponent {
  createChannelService = inject(CreateChannelService);
  createUserService = inject(CreateUserService);
  matDialog = inject(MatDialog);
  inputFieldIsDisplayed: boolean = false;
  menuUserSelectionIsOpen: boolean = false;
  addedUsersToTheChannel: User[] = [];
  addPeopleForm = new FormGroup({
    radioAddPeople: new FormControl('', Validators.required),
    inputFieldAddPeople: new FormControl(''),
  })


  constructor(@Inject(MAT_DIALOG_DATA) public data: { channelData: any }) {

  }


  createChannel() {
    if (this.addPeopleForm.controls.radioAddPeople.value == 'radioAddAllPeople') {
      this.createUserService.allUsersAsObservable.pipe(take(1))
        .subscribe((allusers) => {
          this.createChannelService.createChannelService(this.data.channelData, allusers);
          this.matDialog.closeAll();
        })
    } else {
      this.createChannelService.createChannelService(this.data.channelData, this.addedUsersToTheChannel);
      this.matDialog.closeAll();
    }
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


  getInputValueFromInputfield() {

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
    const userInArray = this.addedUsersToTheChannel.find((existingUser) => existingUser.userId == user.userId);
    if (!userInArray) {
      this.addedUsersToTheChannel.push(user);
      this.menuUserSelectionIsOpen = false;
    }
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
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CreateChannelService } from '../../services/create-channel.service';
import { CreateUserService } from '../../services/create-user.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-dialog-add-people-to-channel',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass],
  templateUrl: './dialog-add-people-to-channel.component.html',
  styleUrl: './dialog-add-people-to-channel.component.scss'
})


export class DialogAddPeopleToChannelComponent {
  createChannelService = inject(CreateChannelService);
  createUserService = inject(CreateUserService);
  matDialog = inject(MatDialog);
  addPeopleForm = new FormGroup({
    radioAddPeople: new FormControl('', Validators.required),
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
      this.createChannelService.createChannelService(this.data.channelData);
      this.matDialog.closeAll();
    }
  }
}

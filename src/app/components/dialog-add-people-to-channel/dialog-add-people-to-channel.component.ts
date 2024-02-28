import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CreateChannelService } from '../../services/create-channel.service';


@Component({
  selector: 'app-dialog-add-people-to-channel',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass],
  templateUrl: './dialog-add-people-to-channel.component.html',
  styleUrl: './dialog-add-people-to-channel.component.scss'
})


export class DialogAddPeopleToChannelComponent {
  createChannelService = inject(CreateChannelService);
  matDialog = inject(MatDialog);
  addPeopleForm = new FormGroup({
    radioAddPeople: new FormControl('', Validators.required),
  })


  constructor(@Inject(MAT_DIALOG_DATA) public data: { channelData: any }) {

  }


  createChannel() {
    this.createChannelService.createChannelService(this.data.channelData);
    this.matDialog.closeAll();
  }
}

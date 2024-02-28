import { Component } from '@angular/core';
import { MatDialogClose } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-dialog-add-people-to-channel',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass],
  templateUrl: './dialog-add-people-to-channel.component.html',
  styleUrl: './dialog-add-people-to-channel.component.scss'
})


export class DialogAddPeopleToChannelComponent {
  addPeopleForm = new FormGroup({
    radioAddPeople: new FormControl('', Validators.required),
  })


  createChannel() {

  }
}

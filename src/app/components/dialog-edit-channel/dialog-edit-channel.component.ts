import { NgClass } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog-edit-channel',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, NgClass],
  templateUrl: './dialog-edit-channel.component.html',
  styleUrl: './dialog-edit-channel.component.scss'
})


export class DialogEditChannelComponent {
  channelNameIsInEditMode: boolean = false;
  channelDescriptionIsInEditMode: boolean = false;
  editChannelForm = new FormGroup({
    channelName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    channelDescription: new FormControl('', Validators.maxLength(150)),
  })


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    
  }


  inputFieldChannelNameIsRequired(): boolean {
    return (this.editChannelForm.controls.channelName.touched && this.editChannelForm.controls.channelName.errors?.['required']) ? true : false;
  }


  inputfieldChannelNameIsToShort(): boolean {
    return (this.editChannelForm.controls.channelName.errors?.['minlength']) ? true : false;
  }


  inputfieldChannelNameIsToLong(): boolean {
    return (this.editChannelForm.controls.channelName.errors?.['maxlength']) ? true : false;
  }


  inputfieldChannelDescriptionIsToLong(): boolean {
    return (this.editChannelForm.controls.channelDescription.errors?.['maxlength']) ? true : false;
  }


  editChannelName(): void {
    this.channelNameIsInEditMode = true;
  }


  saveChangesToEditChannelName(): void {
    this.channelNameIsInEditMode = false;
    this.editChannelForm.controls.channelName.reset();
  }


  editChannelDescription(): void {
    this.channelDescriptionIsInEditMode = true;
  }


  saveChangesToEditChannelDescription(): void {
    this.channelDescriptionIsInEditMode = false;
    this.editChannelForm.controls.channelDescription.reset();
  }
}

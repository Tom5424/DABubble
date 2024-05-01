import { NgClass } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateChannelService } from '../../services/create-channel.service';


@Component({
  selector: 'app-dialog-edit-channel',
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, NgClass],
  templateUrl: './dialog-edit-channel.component.html',
  styleUrls: ['./dialog-edit-channel.component.scss', './dialog-edit-channel.component.media.scss']
})


export class DialogEditChannelComponent {
  createChannelService = inject(CreateChannelService);
  matDialog = inject(MatDialog);
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


  openEditModeForChannelName(): void {
    this.channelNameIsInEditMode = true;
  }


  saveChangesToEditChannelName(): void {
    this.createChannelService.updateChannelNameService(this.data.channelId, this.editChannelForm.controls.channelName.value);
    this.editChannelForm.controls.channelName.reset();
    this.channelNameIsInEditMode = false;
  }


  openEditModeForChannelDescription(): void {
    this.channelDescriptionIsInEditMode = true;
  }


  saveChangesToEditChannelDescription(): void {
    this.createChannelService.updateChannelDescriptionService(this.data.channelId, this.editChannelForm.controls.channelDescription.value);
    this.editChannelForm.controls.channelDescription.reset();
    this.channelDescriptionIsInEditMode = false;
  }


  deleteChannel(): void {
    this.createChannelService.deleteChannelService(this.data.channelId);
    this.matDialog.closeAll();
  }
}

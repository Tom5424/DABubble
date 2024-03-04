import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose } from '@angular/material/dialog';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { CreateChannelService } from '../../services/create-channel.service';
import { CreateUserService } from '../../services/create-user.service';
import { take } from 'rxjs';
import { QuillModule } from 'ngx-quill'


@Component({
  selector: 'app-dialog-add-people-to-channel',
  standalone: true,
  imports: [MatDialogClose, ReactiveFormsModule, NgClass, QuillModule],
  templateUrl: './dialog-add-people-to-channel.component.html',
  styleUrl: './dialog-add-people-to-channel.component.scss'
})


export class DialogAddPeopleToChannelComponent {
  createChannelService = inject(CreateChannelService);
  createUserService = inject(CreateUserService);
  matDialog = inject(MatDialog);
  inputfieldIsDisplayed: boolean = false;
  addPeopleForm = new FormGroup({
    radioAddPeople: new FormControl('', Validators.required),
    inputAddPeople: new FormControl(''),
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


  showInputfieldToAddSpecificMembersToChannel(): void {
    this.inputfieldIsDisplayed = true;
  }


  hideInputfieldToAddSpecificMembersToChannel(): void {
    this.inputfieldIsDisplayed = false;
  }


  focusQuillEditor(event: { editor: any, oldRange: any, range: any, source: any }): void {
    if (this.quillEditorIsNotFocused(event)) {
      event.editor.container.style.border = '1px solid #adb0d9';
      event.editor.container.style.color = '#686868';
    } else if (this.quillEditorIsFocused(event)) {
      event.editor.container.style.border = '1px solid #535AF1';
      event.editor.container.style.color = 'black';
    }
  }


  quillEditorIsNotFocused(event: { editor: any, oldRange: any, range: any, source: any }): boolean {
    return event.range == null;
  }



  quillEditorIsFocused(event: { editor: any, oldRange: any, range: any, source: any }): boolean {
    return event.oldRange === null;
  }
}

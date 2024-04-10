import { NgClass, NgStyle } from '@angular/common';
import { Component, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogUploadedImgFullViewComponent } from '../dialog-uploaded-img-full-view/dialog-uploaded-img-full-view.component';
import { MatDialog } from '@angular/material/dialog';
import { PickerComponent } from '@ctrl/ngx-emoji-mart';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [NgClass, NgStyle, ReactiveFormsModule, PickerComponent],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.scss'
})


export class NewMessageComponent {
  storageService = inject(StorageService);
  matDialog = inject(MatDialog);
  inputValue: string | null | undefined = '';
  emojiPickerIsDisplayed: boolean = false;
  addMessageForm = new FormGroup({
    textarea: new FormControl('', Validators.required)
  })


  imageIsUploading(): boolean {
    return (this.storageService.uploadImg) ? true : false;
  }


  removeUploadedImage(indexFromImage: number): void {
    this.storageService.uploadedImages.splice(indexFromImage, 1);
    if (this.storageService.uploadedImages.length == 0) {
      this.storageService.imgIsUploaded = false;
    }
  }


  openImageDetailView(uploadedImage: string): void {
    this.matDialog.open(DialogUploadedImgFullViewComponent, { data: { uploadedImage: uploadedImage } });
  }


  closeEmojiPickerOrOtherMenuIfClickOutside(): void {
    this.emojiPickerIsDisplayed = false;
  }


  selectEmoji(event: EmojiEvent): void {
    this.inputValue = this.addMessageForm.controls.textarea.value;
    this.inputValue += event.emoji.native ? event.emoji.native : '';
    this.addMessageForm.patchValue({
      textarea: this.inputValue,
    });
  }


  tootgleEmojiPicker() {
    this.emojiPickerIsDisplayed = !this.emojiPickerIsDisplayed;
  }



  selectFile(selectedFile: HTMLInputElement): void {
    this.storageService.selectFileService(selectedFile);
  }
}

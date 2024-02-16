import { Injectable, inject } from '@angular/core';
import { Storage, StorageReference, ref, uploadBytes, getDownloadURL, uploadBytesResumable, UploadResult } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadInvalidDataComponent } from '../components/dialog-upload-invalid-data/dialog-upload-invalid-data.component';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class StorageService {
  storage: Storage = inject(Storage);
  matDialog = inject(MatDialog);
  router = inject(Router);
  urlFromUploadedImg: string = '';
  selectedImageAvatarUrl: string = '';
  imgIsUploaded: boolean = false;
  uploadImg: boolean = false;
  avatarImageUrls: string[] = [
    './assets/img/avatar-1.svg',
    './assets/img/avatar-2.svg',
    './assets/img/avatar-3.svg',
    './assets/img/avatar-4.svg',
    './assets/img/avatar-5.svg',
    './assets/img/avatar-6.svg',
  ];


  selectFileService(selectedFile: HTMLInputElement): void {
    const file = selectedFile.files?.[0];
    const storageRef = ref(this.storage, `img/${file?.name}`);
    this.uploadFileService(file, storageRef);
  }


  uploadFileService(file: Blob | Uint8Array | ArrayBuffer | undefined, storageRef: StorageReference): void {
    if (file) {
      this.uploadImg = true;
      this.imgIsUploaded = false;
      uploadBytes(storageRef, file)
        .then((data) => {
          this.checkDataBeforeUploadService(storageRef, data, file);
        })
        .catch((error) => {
          console.error(error.message);
        })
    }
  }


  checkDataBeforeUploadService(storageRef: StorageReference, data: UploadResult, file: Blob | Uint8Array | ArrayBuffer): void {
    let fileExtension = data.metadata.name.split('.');
    let dataSize = data.metadata.size;
    if (dataSize >= 300000 || (fileExtension[1] !== 'jpg' && fileExtension[1] !== 'png')) {
      this.cancelUploadIfDataIsInvalidService(storageRef, file);
    } else {
      this.getUrlFromUploadedDataService(storageRef);
    }
  }


  cancelUploadIfDataIsInvalidService(storageRef: StorageReference, file: Blob | Uint8Array | ArrayBuffer): void {
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.cancel();
    this.uploadImg = false;
    if (this.router.url == '/avatarPicker') { //  Prevents the dialog from opening when the route is no longer /'avatarPicker'.
      this.matDialog.open(DialogUploadInvalidDataComponent);
    }
  }


  getUrlFromUploadedDataService(storageRef: StorageReference): void {
    getDownloadURL(storageRef)
      .then((url) => {
        this.urlFromUploadedImg = url;
        this.selectedImageAvatarUrl = '';
        this.uploadImg = false;
        this.imgIsUploaded = true;
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}

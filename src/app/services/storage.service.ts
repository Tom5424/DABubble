import { Injectable, inject } from '@angular/core';
import { Storage, StorageReference, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})


export class StorageService {
  storage: Storage = inject(Storage);
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
      uploadBytes(storageRef, file)
        .then((data) => {
          this.uploadImg = true;
          this.getUrlFromUploadedData(storageRef);
        })
        .catch((error) => {
          console.error(error.message);
        })
    }
  }


  getUrlFromUploadedData(storageRef: StorageReference): void {
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

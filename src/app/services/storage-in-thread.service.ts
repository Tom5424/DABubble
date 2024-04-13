import { Injectable, inject } from '@angular/core';
import { Storage, StorageReference, ref, uploadBytes, getDownloadURL, uploadBytesResumable, UploadResult } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { DialogUploadInvalidDataComponent } from '../components/dialog-upload-invalid-data/dialog-upload-invalid-data.component';


@Injectable({
  providedIn: 'root'
})


export class StorageInThreadService {
  storage: Storage = inject(Storage);
  matDialog = inject(MatDialog);
  uploadedImagesInThread: string[] = [];
  imgIsUploadedInThread: boolean = false;
  uploadImgInThread: boolean = false;


  selectFileInThreadService(selectedFile: HTMLInputElement): void {
    const file = selectedFile.files?.[0];
    const storageRef = ref(this.storage, `img/${file?.name}`);
    this.uploadFileServiceInThread(file, storageRef);
  }


  uploadFileServiceInThread(file: Blob | Uint8Array | ArrayBuffer | undefined, storageRef: StorageReference): void {
    if (file) {
      this.uploadImgInThread = true;
      this.imgIsUploadedInThread = false;
      uploadBytes(storageRef, file)
        .then((data) => {
          this.checkDataBeforeUploadInThreadService(storageRef, data, file);
        })
        .catch((error) => {
          console.error(error.message);
        })
    }
  }


  checkDataBeforeUploadInThreadService(storageRef: StorageReference, data: UploadResult, file: Blob | Uint8Array | ArrayBuffer): void {
    let dataType = data.metadata.contentType;
    let dataSize = data.metadata.size;
    if (dataSize >= 300000 || (dataType !== 'image/jpeg' && dataType !== 'image/png')) {
      this.cancelUploadIfDataIsInvalidInThreadService(storageRef, file);
    } else {
      this.getUrlFromUploadedDataInThreadService(storageRef);
    }
  }


  cancelUploadIfDataIsInvalidInThreadService(storageRef: StorageReference, file: Blob | Uint8Array | ArrayBuffer): void {
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.cancel();
    this.uploadImgInThread = false;
    this.matDialog.open(DialogUploadInvalidDataComponent);
  }


  getUrlFromUploadedDataInThreadService(storageRef: StorageReference): void {
    getDownloadURL(storageRef)
      .then((url) => {
        this.uploadedImagesInThread.push(url);
        this.uploadImgInThread = false;
        this.imgIsUploadedInThread = true;
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}
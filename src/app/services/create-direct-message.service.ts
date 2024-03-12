import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs } from '@angular/fire/firestore';
import { DirectMessage } from '../models/direct-message';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CreateDirectMessageService {
  firestore = inject(Firestore);
  directMessagesAsObservable!: Observable<DirectMessage[]>;
  noDirectMessageExistingInDatabase: boolean = false;


  createDirectMessageService(user: User, message: string | null): void {
    const collectionRef = collection(this.firestore, 'directMessages');
    const directMessageRef = new DirectMessage(user, message);
    addDoc(collectionRef, directMessageRef.toJson())
      .then(() => {

      })
  }


  getDirectMessagesService(): void {
    const collectionRef = collection(this.firestore, 'directMessages');
    this.directMessagesAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<DirectMessage[]>;
  }


  checkIfDirectMessagesExistingInDatabaseService(): void {
    const collectionRef = collection(this.firestore, 'directMessages');
    getDocs(collectionRef)
      .then((data) => {
        this.noDirectMessageExistingInDatabase = data.empty;
      })
  }
}

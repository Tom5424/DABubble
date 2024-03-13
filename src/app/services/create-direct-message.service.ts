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


  createDirectMessageService(user: User, messageText: string | null): void {
    const userData = {  // Created a custom User Object here to get the logged in User so that the correct Messages are displayed by the correct User. And prevents error Messages.
      email: user.email,
      isOnline: user.isOnline,
      name: user.name,
      imgUrl: user.imgUrl,
      initialLetter: user.initialLetter,
      userId: user.userId
    }
    const collectionRef = collection(this.firestore, 'directMessages');
    const directMessageRef = new DirectMessage(userData, messageText);
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

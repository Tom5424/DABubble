import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { DirectMessage } from '../models/direct-message';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})


export class CreateDirectMessageService {
  firestore = inject(Firestore);
  authService = inject(AuthService);
  directMessagesAsObservable!: Observable<DirectMessage[]>;
  noDirectMessageExistingInDatabase: boolean = false;
  loadChat: boolean = false;


  createDirectMessageService(user: User, receiverId: string | null, messageText: string | null): void {
    const userData = {  // Created a custom User Object here to get the logged in User so that the correct Messages are displayed by the correct User. And prevents error Messages.
      email: user.email,
      isOnline: user.isOnline,
      name: user.name,
      imgUrl: user.imgUrl,
      initialLetter: user.initialLetter,
      userId: user.userId
    }
    const collectionRef = collection(this.firestore, 'directMessages');
    const directMessageRef = new DirectMessage(userData, receiverId, messageText);
    addDoc(collectionRef, directMessageRef.toJson())
      .then(() => {

      })
  }


  getDirectMessagesService(receiverId: string | null): void {
    this.loadChat = true;
    const collectionRef = query(collection(this.firestore, 'directMessages'), where('receiverId', '==', receiverId));
    collectionData(collectionRef).subscribe(() => {
      this.loadChat = false;
    })
    this.directMessagesAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<DirectMessage[]>;
  }
}
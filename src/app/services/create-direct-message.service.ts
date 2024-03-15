import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
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
  directMessagesAsObservable!: Observable<any[]>;
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
    const collectionRef = query(collection(this.firestore, 'directMessages'), where('receiverId', '==', receiverId), orderBy('senderTime'));
    collectionData(collectionRef).subscribe(() => {
      this.loadChat = false;
    })
    this.directMessagesAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<DirectMessage[]>;
  }


  updateDirectMessageService(messageId: string, inputValue: string | null): void {
    const docRef = doc(this.firestore, 'directMessages', messageId);
    updateDoc(docRef, { messageText: inputValue });
  }


  deleteDirectMessageService(messageId: string): void {
    const docRef = doc(this.firestore, 'directMessages', messageId);
    deleteDoc(docRef);
  }
}
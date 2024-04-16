import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query, where } from '@angular/fire/firestore';
import { ThreadMessage } from '../models/thread-message';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CreateThreadMessageService {
  firestore = inject(Firestore);
  threadMesssagesAsObservable!: Observable<any[]>;


  createThreadMessageService(user: User, receiverId: string | null, messageText: string | null | undefined, uploadedImages: string[]): void {
    const userData = {  // Created a custom User Object here to get the logged in User so that the correct Messages are displayed by the correct User. And prevents error Messages.
      email: user.email,
      isOnline: user.isOnline,
      name: user.name,
      imgUrl: user.imgUrl,
      initialLetter: user.initialLetter,
      userId: user.userId,
    }
    const subCollectionRef = collection(this.firestore, `directMessages/${receiverId}/threadMessages`);
    const threadMessageRef = new ThreadMessage(userData, receiverId, messageText, uploadedImages);
    addDoc(subCollectionRef, threadMessageRef.toJson())
      .then(() => {

      });
  }


  getThreadMessagesService(receiverId: string | null): void {
    const subCollectionRef = query(collection(this.firestore, `directMessages/${receiverId}/threadMessages`), where('receiverId', '==', receiverId), orderBy('senderTime'));
    collectionData(subCollectionRef, { idField: 'id' }).subscribe(() => {

    })
    this.threadMesssagesAsObservable = collectionData(subCollectionRef, { idField: 'id' }) as Observable<ThreadMessage[]>;
  }
}

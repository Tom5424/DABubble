import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, orderBy, query, where } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ChannelMessage } from '../models/channel-message';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class CreateChannelMessageService {
  firestore = inject(Firestore);
  // authService = inject(AuthService);
  channelMessagesAsObservable!: Observable<any[]>;
  loadChat: boolean = false;


  createChannelMessageService(user: User, receiverId: string | null, messageText: string | null | undefined, uploadedImages: string[]): void {
    const userData = {  // Created a custom User Object here to get the logged in User so that the correct Messages are displayed by the correct User. And prevents error Messages.
      email: user.email,
      isOnline: user.isOnline,
      name: user.name,
      imgUrl: user.imgUrl,
      initialLetter: user.initialLetter,
      userId: user.userId,
    }
    const collectionRef = collection(this.firestore, 'channelMessages');
    const channelMessageRef = new ChannelMessage(userData, receiverId, messageText, uploadedImages);
    addDoc(collectionRef, channelMessageRef.toJson())
      .then(() => {

      })
  }


  getChannelMessagesService(receiverId: string | null): void {
    this.loadChat = true;
    const collectionRef = query(collection(this.firestore, 'channelMessages'), where('receiverId', '==', receiverId), orderBy('senderTime'));
    collectionData(collectionRef).subscribe(() => {
      this.loadChat = false;
    })
    this.channelMessagesAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<ChannelMessage[]>;
  }
}

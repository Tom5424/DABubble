import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, arrayRemove, arrayUnion, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
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
      userId: user.userId,
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


  updateEmojisService(messageId: string, idFromLoggedinUser: string, emojiUrl: string, directMessage: DirectMessage): void {
    let indexIdLoggedinUser = 0;
    const { addedEmojis } = directMessage;
    const docRef = doc(this.firestore, 'directMessages', messageId);
    const indexEmojiUrl = directMessage.addedEmojis.findIndex((emoji) => emoji.emojiUrl == emojiUrl);
    directMessage.addedEmojis.forEach((emoji) => {
      indexIdLoggedinUser = emoji.usersWhoHaveUsedTheEmoji.indexOf(idFromLoggedinUser);
    });
    this.checkEmojiStatusService(indexEmojiUrl, indexIdLoggedinUser, docRef, emojiUrl, idFromLoggedinUser, addedEmojis);
  }


  checkEmojiStatusService(indexEmojiUrl: number, indexIdLoggedinUser: number, docRef: DocumentReference, emojiUrl: string, idFromLoggedinUser: string, addedEmojis: any): void {
    if (indexEmojiUrl == -1) {
      this.addEmojiService(docRef, emojiUrl, idFromLoggedinUser);
    } else if (addedEmojis[indexEmojiUrl].usersWhoHaveUsedTheEmoji.includes(idFromLoggedinUser)) {
      this.decreaseEmojiAmountBy1(docRef, addedEmojis, indexEmojiUrl, indexIdLoggedinUser);
      this.removeEmoji(docRef, addedEmojis, indexEmojiUrl);
    } else if (!addedEmojis[indexEmojiUrl].usersWhoHaveUsedTheEmoji.includes(idFromLoggedinUser)) {
      this.increaseEmojiBy1(docRef, addedEmojis, indexEmojiUrl, idFromLoggedinUser);
    }
  }


  addEmojiService(docRef: DocumentReference, emojiUrl: string, idFromLoggedinUser: string): void {
    const emojiData = [{ emojiUrl: emojiUrl, emojiAmount: 1, usersWhoHaveUsedTheEmoji: [idFromLoggedinUser] }];
    updateDoc(docRef, { addedEmojis: arrayUnion(...emojiData) })
  }


  decreaseEmojiAmountBy1(docRef: DocumentReference, addedEmojis: any, indexEmojiUrl: number, indexIdLoggedinUser: number): void {
    addedEmojis[indexEmojiUrl].usersWhoHaveUsedTheEmoji.splice(indexIdLoggedinUser, 1);
    addedEmojis[indexEmojiUrl] = { ...addedEmojis[indexEmojiUrl], emojiAmount: addedEmojis[indexEmojiUrl].emojiAmount - 1 };
    updateDoc(docRef, { addedEmojis: addedEmojis });
  }


  removeEmoji(docRef: DocumentReference, addedEmojis: any, indexEmojiUrl: number): void {
    if (addedEmojis[indexEmojiUrl].emojiAmount == 0) {
      addedEmojis[indexEmojiUrl] = { ...addedEmojis[indexEmojiUrl], emojiAmount: addedEmojis[indexEmojiUrl].emojiAmount };
      updateDoc(docRef, { addedEmojis: arrayRemove(addedEmojis[indexEmojiUrl]) });
    }
  }


  increaseEmojiBy1(docRef: DocumentReference, addedEmojis: any, indexEmojiUrl: number, idFromLoggedinUser: string): void {
    addedEmojis[indexEmojiUrl].usersWhoHaveUsedTheEmoji.push(idFromLoggedinUser);
    addedEmojis[indexEmojiUrl] = { ...addedEmojis[indexEmojiUrl], emojiAmount: addedEmojis[indexEmojiUrl].emojiAmount + 1 };
    updateDoc(docRef, { addedEmojis: addedEmojis });
  }


  deleteDirectMessageService(messageId: string): void {
    const docRef = doc(this.firestore, 'directMessages', messageId);
    deleteDoc(docRef);
  }
}
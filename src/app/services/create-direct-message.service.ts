import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, arrayRemove, arrayUnion, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { DirectMessage } from '../models/direct-message';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { CreateThreadMessageInDirectMessageService } from './create-thread-message-in-direct-message.service';


@Injectable({
  providedIn: 'root'
})


export class CreateDirectMessageService {
  firestore = inject(Firestore);
  authService = inject(AuthService);
  createThreadMessageInDirectMessageService = inject(CreateThreadMessageInDirectMessageService);
  directMessagesAsObservable!: Observable<any[]>;
  loadChat: boolean = false;
  directMessagesSuccessfullySend: boolean = false;


  createDirectMessageService(user: User, receiverId: string | null, senderId: string, messageText: string | null | undefined, uploadedImages: string[]): void {
    const userData = {  // Created a custom User Object here to get the logged in User so that the correct Messages are displayed by the correct User. And prevents error Messages.
      email: user.email,
      name: user.name,
      imgUrl: user.imgUrl,
      userId: user.userId,
    }
    const collectionRef = collection(this.firestore, 'directMessages');
    const directMessageRef = new DirectMessage(userData, receiverId, senderId, messageText, uploadedImages);
    addDoc(collectionRef, directMessageRef.toJson())
      .then((doc) => {
        this.createThreadMessageInDirectMessageService.createThreadMessageService(user, doc.id, messageText, uploadedImages);
        this.directMessagesSuccessfullySendFromNewMessage();
      })
  }


  directMessagesSuccessfullySendFromNewMessage(): void {
    this.directMessagesSuccessfullySend = true;
    setTimeout(() => {
      this.directMessagesSuccessfullySend = false;
    }, 2500);
  }


  getDirectMessagesService(receiverId: string | null, senderId: string): void {
    this.loadChat = true;
    const collectionRef = query(collection(this.firestore, 'directMessages'), where('receiverId', 'in', [senderId, receiverId]), where('senderId', 'in', [senderId, receiverId]), orderBy('senderTime'));
    collectionData(collectionRef).subscribe(() => {
      this.loadChat = false;
    })
    this.directMessagesAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<DirectMessage[]>;
  }


  getDirectMessagesWithoutParametersService(): Observable<DirectMessage[]> {
    const collectionRef = query(collection(this.firestore, 'directMessages'), orderBy('senderTime'));
    return this.directMessagesAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<DirectMessage[]>;
  }


  updateDirectMessageService(messageId: string, inputValue: string | null): void {
    const docRef = doc(this.firestore, 'directMessages', messageId);
    updateDoc(docRef, { messageText: inputValue });
  }


  updateEmojisService(messageId: string, idFromLoggedinUser: string, nameFromLoggedinUser: string | null, emojiUrl: string, directMessage: DirectMessage): void {
    let indexIdLoggedinUser = 0;
    let indexNameLoggedinUser = 0;
    const { addedEmojis } = directMessage;
    const docRef = doc(this.firestore, 'directMessages', messageId);
    const indexEmojiUrl = directMessage.addedEmojis.findIndex((emoji) => emoji.emojiUrl == emojiUrl);
    directMessage.addedEmojis.forEach((emoji) => { indexIdLoggedinUser = emoji.usersIdWhoHaveUsedTheEmoji.indexOf(idFromLoggedinUser) })
    directMessage.addedEmojis.forEach((emoji) => { indexNameLoggedinUser = emoji.usersNameWhoHaveUsedTheEmoji.indexOf(nameFromLoggedinUser ? nameFromLoggedinUser : '') })
    this.checkEmojiStatusService(indexEmojiUrl, indexIdLoggedinUser, indexNameLoggedinUser, nameFromLoggedinUser, docRef, emojiUrl, idFromLoggedinUser, addedEmojis);
  }


  checkEmojiStatusService(indexEmojiUrl: number, indexIdLoggedinUser: number, indexNameLoggedinUser: number, nameFromLoggedinUser: string | null, docRef: DocumentReference, emojiUrl: string, idFromLoggedinUser: string, addedEmojis: any): void {
    if (indexEmojiUrl == -1) {
      this.addEmojiService(docRef, emojiUrl, idFromLoggedinUser, nameFromLoggedinUser);
    } else if (addedEmojis[indexEmojiUrl].usersIdWhoHaveUsedTheEmoji.includes(idFromLoggedinUser)) {
      this.decreaseEmojiAmountBy1(docRef, addedEmojis, indexEmojiUrl, indexIdLoggedinUser, indexNameLoggedinUser);
      this.removeEmoji(docRef, addedEmojis, indexEmojiUrl);
    } else if (!addedEmojis[indexEmojiUrl].usersIdWhoHaveUsedTheEmoji.includes(idFromLoggedinUser)) {
      this.increaseEmojiBy1(docRef, addedEmojis, indexEmojiUrl, idFromLoggedinUser, nameFromLoggedinUser);
    }
  }


  addEmojiService(docRef: DocumentReference, emojiUrl: string, idFromLoggedinUser: string, nameFromLoggedinUser: string | null): void {
    const emojiData = [{ emojiUrl: emojiUrl, emojiAmount: 1, usersIdWhoHaveUsedTheEmoji: [idFromLoggedinUser], usersNameWhoHaveUsedTheEmoji: [nameFromLoggedinUser] }];
    updateDoc(docRef, { addedEmojis: arrayUnion(...emojiData) })
  }


  decreaseEmojiAmountBy1(docRef: DocumentReference, addedEmojis: any, indexEmojiUrl: number, indexIdLoggedinUser: number, indexNameLoggedinUser: number): void {
    addedEmojis[indexEmojiUrl].usersIdWhoHaveUsedTheEmoji.splice(indexIdLoggedinUser, 1);
    addedEmojis[indexEmojiUrl].usersNameWhoHaveUsedTheEmoji.splice(indexNameLoggedinUser, 1);
    addedEmojis[indexEmojiUrl] = { ...addedEmojis[indexEmojiUrl], emojiAmount: addedEmojis[indexEmojiUrl].emojiAmount - 1 };
    updateDoc(docRef, { addedEmojis: addedEmojis });
  }


  removeEmoji(docRef: DocumentReference, addedEmojis: any, indexEmojiUrl: number): void {
    if (addedEmojis[indexEmojiUrl].emojiAmount == 0) {
      addedEmojis[indexEmojiUrl] = { ...addedEmojis[indexEmojiUrl], emojiAmount: addedEmojis[indexEmojiUrl].emojiAmount };
      updateDoc(docRef, { addedEmojis: arrayRemove(addedEmojis[indexEmojiUrl]) });
    }
  }


  increaseEmojiBy1(docRef: DocumentReference, addedEmojis: any, indexEmojiUrl: number, idFromLoggedinUser: string, nameFromLoggedinUser: string | null): void {
    addedEmojis[indexEmojiUrl].usersIdWhoHaveUsedTheEmoji.push(idFromLoggedinUser);
    addedEmojis[indexEmojiUrl].usersNameWhoHaveUsedTheEmoji.push(nameFromLoggedinUser);
    addedEmojis[indexEmojiUrl] = { ...addedEmojis[indexEmojiUrl], emojiAmount: addedEmojis[indexEmojiUrl].emojiAmount + 1 };
    updateDoc(docRef, { addedEmojis: addedEmojis });
  }


  deleteDirectMessageService(messageId: string): void {
    const docRef = doc(this.firestore, 'directMessages', messageId);
    deleteDoc(docRef);
  }
}
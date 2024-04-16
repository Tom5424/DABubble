import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, arrayRemove, arrayUnion, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { ThreadMessage } from '../models/thread-message';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CreateThreadMessageService {
  firestore = inject(Firestore);
  threadMesssagesAsObservable!: Observable<any[]>;
  loadChat: boolean = false;


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


  getThreadMessagesService(receiverId: string | null): Observable<ThreadMessage[]> {
    this.loadChat = true;
    const subCollectionRef = query(collection(this.firestore, `directMessages/${receiverId}/threadMessages`), where('receiverId', '==', receiverId), orderBy('senderTime'));
    collectionData(subCollectionRef, { idField: 'id' }).subscribe(() => {
      this.loadChat = false;
    })
    return this.threadMesssagesAsObservable = collectionData(subCollectionRef, { idField: 'id' }) as Observable<ThreadMessage[]>;
  }


  updateThreadMessageService(directMesageId: string | null, threadMessageId: string, inputValue: string | null): void {
    const docRef = doc(this.firestore, `directMessages/${directMesageId}/threadMessages/${threadMessageId}`);
    updateDoc(docRef, { messageText: inputValue });
  }


  updateEmojisService(directMessageId: string | null, threadMessageId: string, idFromLoggedinUser: string, nameFromLoggedinUser: string | null, emojiUrl: string, threadMessage: ThreadMessage): void {
    let indexIdLoggedinUser = 0;
    let indexNameLoggedinUser = 0;
    const { addedEmojis } = threadMessage;
    const docRef = doc(this.firestore, `directMessages/${directMessageId}/threadMessages/${threadMessageId}`);
    const indexEmojiUrl = threadMessage.addedEmojis.findIndex((emoji) => emoji.emojiUrl == emojiUrl);
    threadMessage.addedEmojis.forEach((emoji) => { indexIdLoggedinUser = emoji.usersIdWhoHaveUsedTheEmoji.indexOf(idFromLoggedinUser) })
    threadMessage.addedEmojis.forEach((emoji) => { indexNameLoggedinUser = emoji.usersNameWhoHaveUsedTheEmoji.indexOf(nameFromLoggedinUser ? nameFromLoggedinUser : '') })
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


  deleteThreadMessageService(directMesageId: string | null, threadMessageId: string): void {
    const docRef = doc(this.firestore, `directMessages/${directMesageId}/threadMessages/${threadMessageId}`);
    deleteDoc(docRef);
  }
}

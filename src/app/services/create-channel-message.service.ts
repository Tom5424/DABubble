import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, arrayRemove, arrayUnion, collection, collectionData, deleteDoc, doc, orderBy, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChannelMessage } from '../models/channel-message';
import { User } from '../models/user';
import { CreateThreadMessageInChannelMessageService } from './create-thread-message-in-channel-message.service';


@Injectable({
  providedIn: 'root'
})


export class CreateChannelMessageService {
  firestore = inject(Firestore);
  createThreadMessageInChannelMessageService = inject(CreateThreadMessageInChannelMessageService);
  channelMessagesAsObservable!: Observable<any[]>;
  loadChat: boolean = false;
  channelMessagesSuccessfullySend: boolean = false;


  createChannelMessageService(user: User, receiverId: string | null, messageText: string | null | undefined, uploadedImages: string[]): void {
    const userData = {  // Created a custom User Object here to get the logged in User so that the correct Messages are displayed by the correct User. And prevents error Messages.
      email: user.email,
      name: user.name,
      imgUrl: user.imgUrl,
      userId: user.userId,
    }
    const collectionRef = collection(this.firestore, 'channelMessages');
    const channelMessageRef = new ChannelMessage(userData, receiverId, messageText, uploadedImages);
    addDoc(collectionRef, channelMessageRef.toJson())
      .then((doc) => {
        this.createThreadMessageInChannelMessageService.createThreadMessageService(user, doc.id, messageText, uploadedImages);
        this.channelMessagesSuccessfullySendFromNewMessage();
      })
  }


  channelMessagesSuccessfullySendFromNewMessage(): void {
    this.channelMessagesSuccessfullySend = true;
    setTimeout(() => {
      this.channelMessagesSuccessfullySend = false;
    }, 2500);
  }


  getChannelMessagesService(receiverId: string | null): void {
    this.loadChat = true;
    const collectionRef = query(collection(this.firestore, 'channelMessages'), where('receiverId', '==', receiverId), orderBy('senderTime'));
    collectionData(collectionRef).subscribe(() => {
      this.loadChat = false;
    })
    this.channelMessagesAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<ChannelMessage[]>;
  }


  getChannelMessagesWithoutParametersService(): Observable<ChannelMessage[]> {
    const collectionRef = query(collection(this.firestore, 'channelMessages'), orderBy('senderTime'));
    return this.channelMessagesAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<ChannelMessage[]>;
  }


  updateChannelMessageService(messageId: string, inputValue: string | null): void {
    const docRef = doc(this.firestore, 'channelMessages', messageId);
    updateDoc(docRef, { messageText: inputValue });
  }


  updateEmojisService(messageId: string, idFromLoggedinUser: string, nameFromLoggedinUser: string | null, emojiUrl: string, channelMessage: ChannelMessage): void {
    let indexIdLoggedinUser = 0;
    let indexNameLoggedinUser = 0;
    const { addedEmojis } = channelMessage;
    const docRef = doc(this.firestore, 'channelMessages', messageId);
    const indexEmojiUrl = channelMessage.addedEmojis.findIndex((emoji) => emoji.emojiUrl == emojiUrl);
    channelMessage.addedEmojis.forEach((emoji) => { indexIdLoggedinUser = emoji.usersIdWhoHaveUsedTheEmoji.indexOf(idFromLoggedinUser) })
    channelMessage.addedEmojis.forEach((emoji) => { indexNameLoggedinUser = emoji.usersNameWhoHaveUsedTheEmoji.indexOf(nameFromLoggedinUser ? nameFromLoggedinUser : '') })
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


  deleteChannelMessageService(messageId: string): void {
    const docRef = doc(this.firestore, 'channelMessages', messageId);
    deleteDoc(docRef);
  }
}

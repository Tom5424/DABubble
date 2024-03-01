import { Injectable, inject } from '@angular/core';
import { DocumentReference, Firestore, addDoc, collection, collectionData, doc, getDocs, orderBy, query } from '@angular/fire/firestore';
import { Channel } from '../models/channel';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ChannelMembers } from '../models/channel-members';


@Injectable({
  providedIn: 'root'
})


export class CreateChannelService {
  firestore = inject(Firestore);
  allChannelsAsObservable!: Observable<Channel[]>;
  noChannelsExistingInDatabase: boolean = false;
  loadChannels: boolean = false;


  createChannelService(channelData: any, allusers?: User[]): void {
    const collectionRef = collection(this.firestore, 'channels');
    const channelRef = new Channel(channelData);
    addDoc(collectionRef, channelRef.toJson())
      .then((docRef) => {
        this.createChannelMembersService(docRef, allusers);
      })
      .catch((error) => {
        console.error(error.message);
      })
  }


  /////////////////////////////////////////////
  createChannelMembersService(docRef: DocumentReference, allusers: User[] | undefined): void {
    const chnnelMembersSubCollectionRef = collection(this.firestore, `channels/${docRef.id}/channelMembers`);
    allusers?.forEach((user) => {
      const channelMembers = new ChannelMembers(user, user.userId);
      addDoc(chnnelMembersSubCollectionRef, channelMembers.toJson());
    });
  }


  getAllChannelsService(): void {
    this.loadChannels = true;
    const collectionRef = query(collection(this.firestore, 'channels'), orderBy('initialLetter'));
    collectionData(collectionRef)
      .subscribe(() => {
        this.loadChannels = false;
      })
    this.allChannelsAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<Channel[]>;
  }


  checkIfChannelsExistingInDatabaseService(): void {
    const collectionRef = collection(this.firestore, 'channels');
    getDocs(collectionRef)
      .then((data) => {
        this.noChannelsExistingInDatabase = data.empty;
      })
  }
}

import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, doc, getDoc, getDocs, orderBy, query } from '@angular/fire/firestore';
import { Channel } from '../models/channel';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class CreateChannelService {
  firestore = inject(Firestore);
  allChannelsAsObservable!: Observable<any[]>;
  channel!: Channel;
  noChannelsExistingInDatabase: boolean = false;
  loadChannels: boolean = false;


  createChannelService(channelData: any, channelMembers: User[]): void {
    const collectionRef = collection(this.firestore, 'channels');
    const channelRef = new Channel(channelData, channelMembers);
    addDoc(collectionRef, channelRef.toJson())
      .then(() => {

      })
      .catch((error) => {
        console.error(error.message);
      })
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


  getSingleChannelService(channelId: string | null): void {
    if (channelId) {
      const docRef = doc(this.firestore, 'channels', channelId);
      getDoc(docRef)
        .then((docData) => {
          this.channel = docData.data() as Channel;
        })
    }
  }


  checkIfChannelsExistingInDatabaseService(): void {
    const collectionRef = collection(this.firestore, 'channels');
    getDocs(collectionRef)
      .then((data) => {
        this.noChannelsExistingInDatabase = data.empty;
      })
  }
}

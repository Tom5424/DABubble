import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, getDocs, orderBy, query } from '@angular/fire/firestore';
import { Channel } from '../models/channel';
import { Observable } from 'rxjs';
import { User } from '../models/user';


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
    const channelRef = new Channel(channelData, allusers);
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
    this.allChannelsAsObservable = collectionData(collectionRef) as Observable<Channel[]>;
  }


  checkIfChannelsExistingInDatabaseService(): void {
    const collectionRef = collection(this.firestore, 'channels');
    getDocs(collectionRef)
      .then((data) => {
        this.noChannelsExistingInDatabase = data.empty;
      })
  }
}

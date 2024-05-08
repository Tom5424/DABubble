import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, arrayUnion, collection, collectionData, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, updateDoc } from '@angular/fire/firestore';
import { Channel } from '../models/channel';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class CreateChannelService {
  firestore = inject(Firestore);
  router = inject(Router);
  allChannelsAsObservable!: Observable<any[]>;
  channel!: Channel;
  loadChannels: boolean = false;
  loadSelectedChannel: boolean = false;


  createChannelService(channelData: any, channelMembers: User[], userWhoCreatedChannel: string | null): void {
    const collectionRef = collection(this.firestore, 'channels');
    const channelRef = new Channel(channelData, channelMembers, userWhoCreatedChannel);
    addDoc(collectionRef, channelRef.toJson())
      .then((docData) => {
        this.router.navigateByUrl('/mainView/channel/' + docData.id);
      })
      .catch((error) => {
        console.error(error.message);
      })
  }


  getAllChannelsService(): Observable<Channel[]> {
    this.loadChannels = true;
    const collectionRef = query(collection(this.firestore, 'channels'), orderBy('initialLetter'));
    collectionData(collectionRef)
      .subscribe(() => {
        this.loadChannels = false;
      })
    return this.allChannelsAsObservable = collectionData(collectionRef, { idField: 'id' }) as Observable<Channel[]>;
  }


  getSingleChannelService(channelId: string | null): void {
    this.loadSelectedChannel = true;
    if (channelId) {
      const docRef = doc(this.firestore, 'channels', channelId);
      getDoc(docRef)
        .then((docData) => {
          this.loadSelectedChannel = false;
          this.channel = docData.data() as Channel;
        })
    }
  }


  directToOtherChannelIfDeleteChannel(): void {
    const collectionRef = collection(this.firestore, 'channels');
    getDocs(collectionRef)
      .then((data) => {
        if (!data.empty) {
          this.router.navigateByUrl('/mainView/channel/' + data.docs[0].id);
        } else {
          this.router.navigateByUrl('/mainView/welcomeToDABubble');
        }
      })
  }


  updateChannelNameService(channelId: string | null, newChannelName: string | null): void {
    if (channelId) {
      const docRef = doc(this.firestore, 'channels', channelId);
      updateDoc(docRef, { channelName: newChannelName })
        .then(() => {
          onSnapshot(docRef, (channelData) => {
            this.channel.channelName = channelData.data()?.['channelName'];
          });
        })
    }
  }


  updateChannelDescriptionService(channelId: string | null, newChannelDescription: string | null): void {
    if (channelId) {
      const docRef = doc(this.firestore, 'channels', channelId);
      updateDoc(docRef, { channelDescription: newChannelDescription })
        .then(() => {
          onSnapshot(docRef, (channelData) => {
            this.channel.channelDescription = channelData.data()?.['channelDescription'];
          });
        })
    }
  }


  updateChannelMembersService(channelId: string | null, newChannelMembers: User[]): void {
    if (channelId) {
      const docRef = doc(this.firestore, 'channels', channelId);
      updateDoc(docRef, { channelMembers: arrayUnion(...newChannelMembers) })
        .then(() => {
          onSnapshot(docRef, (channelData) => {
            this.channel.channelMembers = channelData.data()?.['channelMembers'];
          })
        })
    }
  }


  deleteChannelService(messageId: string): void {
    const docRef = doc(this.firestore, 'channels', messageId);
    deleteDoc(docRef)
      .then(() => {
        this.directToOtherChannelIfDeleteChannel();
      })
      .catch((error) => {
        console.error(error.message);
      })
  }
}

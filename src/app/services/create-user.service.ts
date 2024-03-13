import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, getDocs, updateDoc, deleteDoc, query, orderBy, getDoc } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CreateUserService {
  firestore = inject(Firestore);
  allUsersAsObservable!: Observable<User[]>;
  user!: User;
  noContactsExistingInDatabase: boolean = false;
  loadContacts: boolean = false;
  load: boolean = false;


  createUserService(userId: string, user: User): void {
    const docRef = doc(this.firestore, 'users', userId);
    const userRef = new User(user, userId);
    setDoc(docRef, userRef.toJson())
      .then(() => {

      })
      .catch((error) => {
        console.error(error.message);
      })
  }


  getAllUserService(): Observable<User[]> {
    this.loadContacts = true;
    const collectionRef = query(collection(this.firestore, 'users'), orderBy('initialLetter'));
    collectionData(collectionRef)
      .subscribe(() => {
        this.loadContacts = false;
      })
    return collectionData(collectionRef, { idField: 'id' }) as Observable<User[]>;
  }


  getSingelUserService(userId: string | null): void {
    this.loadContacts = true;
    if (userId) {
      const docRef = doc(this.firestore, 'users', userId);
      getDoc(docRef).then((userData) => {
        this.user = userData.data() as User;
        this.loadContacts = false;
      })
    }
  }


  checkIfUserExistingInDatabaseService(): void {
    const collectionRef = collection(this.firestore, 'users');
    getDocs(collectionRef)
      .then((data) => {
        this.noContactsExistingInDatabase = data.empty;
      })
  }


  updateUserNameService(userId: string, formValues: any): void {
    const docRef = doc(this.firestore, 'users', userId);
    updateDoc(docRef, { name: formValues.name, initialLetter: formValues.name.charAt(0).toLocaleLowerCase() })
      .then(() => {
        // this.updateUsersThatAddedToChannel(userId, formValues);
      })
  }


  // updateUsersThatAddedToChannel(userId: string, formValues: any) {
  //   const collectionRef = collection(this.firestore, `channels/${userId}/channelMembers`);
  //   getDocs(collectionRef)
  //     .then((channelDatas) => {
  //       channelDatas.forEach((channelData) => {
  //         console.log(channelData);
  //       });
  //     })
  // }


  updateUserOnlineStatusService(userId: string | undefined, userOnlineStatus: boolean, guestUserIsLoggedIn?: boolean): Promise<void> {
    if (userId && !guestUserIsLoggedIn) {
      const docRef = doc(this.firestore, 'users', userId);
      return updateDoc(docRef, { isOnline: userOnlineStatus });
    } else {
      return Promise.resolve();
    }
  }


  // updateUserHaveAtLeastOneMessageService(userId: string | null, userHaveAtLeastOneMessage: boolean): void {
  //   setTimeout(() => {
  //     this.load = true;
  //   }, 400);
  //   if (userId) {
  //     const docRef = doc(this.firestore, 'users', userId);
  //     updateDoc(docRef, { haveAtLeastOneMessage: userHaveAtLeastOneMessage })
  //       .then(() => {
  //         this.load = false;
  //       })
  //   }
  // }


  deleteUserService(userId: string): void {
    const docRef = doc(this.firestore, 'users', userId);
    deleteDoc(docRef)
      .catch((error) => {
        console.error(error.message);
      })
  }
}

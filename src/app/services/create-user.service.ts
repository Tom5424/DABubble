import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CreateUserService {
  firestore = inject(Firestore);
  allUsersAsObservable!: Observable<User[]>;
  noContactsExistingInDatabase: boolean = false;
  userId: string = '';
  loadContacts: boolean = false;


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


  getAllUserService(): void {
    this.loadContacts = true;
    const collectionRef = query(collection(this.firestore, 'users'), orderBy('initialLetter'));
    collectionData(collectionRef)
      .subscribe(() => {
        this.loadContacts = false;
      })
    this.allUsersAsObservable = collectionData(collectionRef) as Observable<User[]>;
  }


  checkIfContactsExistingInDatabaseService(): void {
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
  //   const collectionRef = collection(this.firestore, 'channels');
  //   getDocs(collectionRef)
  //     .then((docs) => {
  //       docs.forEach((doc) => {
  //         doc.data()['members'].forEach((doc: User) => {
  //           this.userId = doc.userId;
  //         });
  //         console.log(this.userId);
  //       });
  //       if (this.userId == userId) {
  //         const docRef = doc(this.firestore, 'users', this.userId);
  //         updateDoc(docRef, { name: formValues.name });
  //       }
  //     })
  // }


  updateUserOnlineStatusService(userId: string | undefined, userOnlineStatus: boolean): void {
    if (userId) {
      const docRef = doc(this.firestore, 'users', userId);
      updateDoc(docRef, { isOnline: userOnlineStatus });
    }
  }


  deleteUserService(userId: string): void {
    const docRef = doc(this.firestore, 'users', userId);
    deleteDoc(docRef)
      .catch((error) => {
        console.error(error.message);
      })
  }
}

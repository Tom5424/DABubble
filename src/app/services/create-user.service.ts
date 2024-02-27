import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CreateUserService {
  fireStore = inject(Firestore);
  allUsersAsObservable!: Observable<User[]>;
  noContactsExistingInDatabase: boolean = false;


  createUserService(userId: string, user: User): void {
    const docRef = doc(this.fireStore, 'users', userId);
    const userRef = new User(user, userId);
    setDoc(docRef, userRef.toJson())
      .then(() => {

      })
      .catch((error) => {
        console.error(error.message);
      })
  }


  getAllUserService(): void {
    const collectionRef = query(collection(this.fireStore, 'users'), orderBy('initialLetter'));
    this.allUsersAsObservable = collectionData(collectionRef) as Observable<User[]>;
  }


  checkIfContactsExistingInDatabaseService(): void {
    const collectionRef = collection(this.fireStore, 'users');
    getDocs(collectionRef)
      .then((data) => {
        this.noContactsExistingInDatabase = data.empty;
      })
  }


  updateUserNameService(userId: string | undefined, formValues: any): void {
    if (userId) {
      const docRef = doc(this.fireStore, 'users', userId);
      updateDoc(docRef, { name: formValues.name, initialLetter: formValues.name.charAt(0).toLocaleLowerCase() })
    }
  }


  // updateUserOnlineStatusService(userId: string | undefined, userOnlineStatus: boolean): void {
  //   if (userId) {
  //     const docRef = doc(this.fireStore, 'users', userId);
  //     updateDoc(docRef, { isOnline: userOnlineStatus });
  //   }
  // }


  deleteUserService(userId: string): void {
    const docRef = doc(this.fireStore, 'users', userId);
    deleteDoc(docRef)
      .catch((error) => {
        console.error(error.message);
      })
  }
}

import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, addDoc, updateDoc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class CreateUserService {
  fireStore = inject(Firestore);
  // user!: User;


  createUserService(userId: string, user: User): void {
    const docRef = doc(this.fireStore, 'users', userId);
    const userRef = new User(user);
    setDoc(docRef, userRef.toJson())
      .then(() => {

      })
      .catch((error) => {
        console.error(error.message);
      })
    // const collectionRef = collection(this.fireStore, 'users');
    // const userRef = new User(user);
    // addDoc(collectionRef, userRef.toJson())
    //   .then((userData) => {

    //   })
  }


  // getCurrentUserService(userId: string | undefined) {
  //   if (userId) {
  //     const docRef = doc(this.fireStore, 'users', userId);
  //     getDoc(docRef)
  //       .then((docData) => {
  //         this.user = docData.data() as User;
  //       })
  //   }
  // }


  getUserService() {

  }


  updateUserNameService(userId: string | undefined, formValues: any): void {
    if (userId) {
      const docRef = doc(this.fireStore, 'users', userId);
      updateDoc(docRef, { name: formValues.name })
    }
  }


  updateUserOnlineStatusService(userId: string | undefined, userOnlineStatus: boolean): void {
    if (userId) {
      const docRef = doc(this.fireStore, 'users', userId);
      updateDoc(docRef, { isOnline: userOnlineStatus });
    }
  }


  deleteUserService(userId: string): void {
    const docRef = doc(this.fireStore, 'users', userId);
    deleteDoc(docRef)
      .catch((error) => {
        console.error(error.message);
      })
  }
}

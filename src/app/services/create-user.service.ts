import { Injectable, inject } from '@angular/core';
import { Firestore, collection, doc, setDoc, addDoc } from '@angular/fire/firestore';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})


export class CreateUserService {
  fireStore = inject(Firestore);


  createUserService(user: User): void {
    const collectionRef = collection(this.fireStore, 'users');
    const userRef = new User(user);
    addDoc(collectionRef, userRef.toJson())
      .then((userData) => {
        console.log(userData);
      })
  }
}

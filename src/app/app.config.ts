import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environments';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideQuillConfig } from 'ngx-quill'


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  importProvidersFrom([
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ]), provideAnimationsAsync('noop'),
  provideQuillConfig({ modules: { syntax: false, toolbar: [] } })
  ],
};





// , importProvidersFrom([
//   provideFirebaseApp(() => initializeApp(
//     environment.firebaseConfig
//   ))),
// importProvidersFrom(provideAuth(() => getAuth())),
// importProvidersFrom(provideFirestore(() => getFirestore())),
// importProvidersFrom(provideStorage(() => getStorage()))]
//   ]

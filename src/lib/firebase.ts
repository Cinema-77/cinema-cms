import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDRFjIzTbGb8ZdRekIvE31E2l170WntJLE',
  authDomain: 'movie-1d69b.firebaseapp.com',
  databaseURL: 'gs://movie-1d69b.appspot.com',
  projectId: 'movie-1d69b',
  storageBucket: 'movie-1d69b.appspot.com',
  messagingSenderId: '24541523655',
  appId: '1:24541523655:web:baedb7dcee80b502b758e2',
  measurementId: 'G-8REFDDS6X1',
};

const firebaseApp = initializeApp(firebaseConfig);

const storage = getStorage(firebaseApp);

export { storage };

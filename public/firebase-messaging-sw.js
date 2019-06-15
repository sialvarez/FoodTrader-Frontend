/* eslint-disable no-unused-labels */
// eslint-disable-next-line no-labels
importScripts: ['./bower_components/sw-toolbox/sw-toolbox.js'];
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

const config = {
  apiKey: 'AIzaSyDJMBUYLRQqfC2u3HHFXUvLuXO0GlYhokI',
  authDomain: 'foodtrader-74ab3.firebaseapp.com',
  databaseURL: 'https://foodtrader-74ab3.firebaseio.com',
  projectId: 'foodtrader-74ab3',
  storageBucket: '',
  messagingSenderId: '301000161708',
  appId: '1:301000161708:web:c3302d7cd81d9c76',
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

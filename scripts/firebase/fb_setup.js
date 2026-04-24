/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/


//------------------------------------------------------------------------------//
//firebase config
//used to initialize firebase access
const firebaseConfig = {
  apiKey: "AIzaSyCg_wVQVx1Jr6JcXnxIjs58owZ9laB7Llo",
  authDomain: "alex-curwen-12comp.firebaseapp.com",
  databaseURL: "https://alex-curwen-12comp-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "alex-curwen-12comp",
  storageBucket: "alex-curwen-12comp.firebasestorage.app",
  messagingSenderId: "842988938683",
  appId: "1:842988938683:web:d4ddeaa78536ac10b9109e"
};
//------------------------------------------------------------------------------//


//------------------------------------------------------------------------------//
//fb_init()
// Initialize Firebase
function fb_init() {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized");
}

//------------------------------------------------------------------------------//

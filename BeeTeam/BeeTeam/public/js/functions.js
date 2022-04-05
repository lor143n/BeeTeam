

/*import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import * as func2 from "./func2.js";

const firebaseConfig = {
    apiKey: "AIzaSyA0PdI6RRM_VqyxEsUYuPe0Gu_TUrbbuuQ",
    authDomain: "beeteam-2a5f7.firebaseapp.com",
    databaseURL: "https://beeteam-2a5f7-default-rtdb.firebaseio.com",
    projectId: "beeteam-2a5f7",
    storageBucket: "beeteam-2a5f7.appspot.com",
    messagingSenderId: "223479016271",
    appId: "1:223479016271:web:383e9319470cfaf4bd733a",
    measurementId: "G-04ERX78GQJ"
  };

  // Initialize Firebase
 export const app= initializeApp(firebaseConfig);
 const database = getDatabase(app);
 const auth=getAuth();

   let sub=document.getElementById("sub");
   let log=document.getElementById("login");
   let out=document.getElementById("logout");


  sub.addEventListener('click', (e) =>{

  var nome=document.getElementById("nreg").value;
  var cognome=document.getElementById("creg").value;
  var numero=document.getElementById("numreg").value;
  var email=document.getElementById("ereg").value;
  var password=document.getElementById("preg").value;

 createUserWithEmailAndPassword(auth, email, password,nome,cognome,numero)
  .then((userCredential) => {
       
       const user = userCredential.user;
       set(ref(database,'users/' + user.uid),{
           email : email,
           password:password,
           nome: nome,
           cognome:cognome,
           telefono:numero,
           imageURL: "nofoto.jpg"
       });
       alert("User Create! Now Log in");


})
  .catch((error) => {
       const errorCode = error.code;
       const errorMessage = error.message;
       alert(errorMessage);
 });
 });

 log.addEventListener('click', (e) => {

  var email=document.getElementById("emailacc").value;
  var password=document.getElementById("pacc").value;

signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {

   const user = userCredential.user;
   const dt= new Date();
   update(ref(database,'users/' + user.uid),{
           last_login : dt,
       })
       alert("User Loged in!");
      
      
       window.onloadstart= window.location.href="profilo.html";
       func2.openProfile();
       
       //document.getElementById("c1").textContent="CIAOOOOO"
       
     
       
 })
 .catch((error) => {
const errorCode = error.code;
const errorMessage = error.message;
alert(errorMessage);
 });

 });




onAuthStateChanged(auth, (user) => {
 if (user) {
  // document.getElementById("login").innerHTML="EseguitoL'accesso"
} else {
sessionStorage.clear('user');
}
});

//CAPIRE DOVE METTERE 

 signOut(auth).then(() => {
    // Sign-out successful.
    //alert("User Loged out!")
 }).catch((error) => {
   // An error happened.
   const errorCode = error.code;
   const errorMessage = error.message;
alert(errorMessage);
 });
*/
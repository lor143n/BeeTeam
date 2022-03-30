/*function edit(){
    
}
function modpw(){
    var pass=document.getElementById("pw").ariaValueNow;
    if(pass.length < 6 ){
        alert("La password deve contenere almeno 6 caratteri");
    }
};
function Registrazione(){
   
    windows.alert("Grazie per la registrazione!");
   
}

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Import the functions you need from the SDKs you need
import firebase from "@firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
firebase.initializeApp(firebaseConfig);
//collezione
  var Access= firebase.database().ref("BeeReg");
  document.getElementById("BeeReg").addEventListener("submit",submitForm);

  function submitForm(e){
      e.preventDefault();

      var nome=getElementVal("nreg");
      var cognome=getElementVal("creg");
      var numero=getElementVal("numreg");
      var email=getElementVal("ereg");
      var password=getElementVal("preg");
      console.log(nome,cognome,numero,email,password);
      saveMessage(nome,cognome,numero,email,password);
  };

  const saveMessage = (nome,cognome,numero,email,password) => {
      var newAccess=Access.push();
      newAccess.set({
          nome: nome,
          cognome : cognome,
          numero :numero,
          email: email,
          password : password
      });
  };

  const getElementVal = (id) => {
      return document.getElementById(id).value;
  };
*/
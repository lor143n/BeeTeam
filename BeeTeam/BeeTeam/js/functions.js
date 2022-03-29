function edit(){
    
}

function Registrazione(){
   
    windows.alert("Grazie per la registrazione!");
   
}
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA0PdI6RRM_VqyxEsUYuPe0Gu_TUrbbuuQ",
    authDomain: "beeteam-2a5f7.firebaseapp.com",
    projectId: "beeteam-2a5f7",
    storageBucket: "beeteam-2a5f7.appspot.com",
    messagingSenderId: "223479016271",
    appId: "1:223479016271:web:383e9319470cfaf4bd733a",
    measurementId: "G-04ERX78GQJ"
  };
  firebase.initializeApp(firebaseConfig);

  var BeeAccess= firebase.database().ref("BeeAccess");
  document.getElementById('BeeAccess').addEventListener("submit",submitForm);
  function submitForm(e){
      e.preventDefault();
      var nome=getElementVal("nreg");
      var cognome=getElementVal("creg");
      var numero=getElementVal("numreg");
      var email=getElementVal("ereg");
      var password=getElementVal("preg");
  };

  const saveMessage =(nome,cognome,numero,email,password)=>
  {
      var newContactForm=newContactFormDB.push();
      newContactForm.set({
          nome: nome,
          cognome : cognome,
          numero :numero,
          email: email,
          password : password
      });
  };
  const getElementVal =(id) => {
      return document.getElementById(id).value;
  };
import { getDoc,getFirestore,getDocs,setDoc, updateDoc,arrayUnion,doc , increment,deleteDoc,arrayRemove} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import { getStorage, ref as storef, uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js";
import { getDatabase, set, ref, update , get, child,onValue ,onChildAdded, orderByKey,remove} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAuth,updatePassword, deleteUser, updateEmail,sendEmailVerification,signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";

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
    const app= initializeApp(firebaseConfig);
    const fire=getFirestore(app);
    const database=getDatabase(app);
    const auth=getAuth();
    var storage=getStorage(app);



    //riottenere dati locale
    export function getUser(){
        var CurrentUser=null;
        let keepLog=localStorage.getItem('KeepLog');
            if(keepLog == "yes"){
                CurrentUser=JSON.parse(localStorage.getItem('user'));
                }
            else{
                CurrentUser=JSON.parse(sessionStorage.getItem('user'));
                }
        return CurrentUser;
    }

    //Accesso
    export async function RegisterUser(user,email,password,nome,cognome,numero, password_verifica){
        const db = ref(database);
        if(password==password_verifica){
        await get(child(db,"Users/")).then((snapshot)=>{
            var duplicato=false;
            snapshot.forEach((snapchild)=>{
                if(snapchild.val().user==user ){
                    alert("Account already exists!");
                    duplicato=true;
                }
            })

            if(duplicato==false){
                 setDoc(doc(fire, "users", user), {
                    creati:[" "],
                    aderiti:[" "],
                    numero_creati: 0
            });
                            
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                const u = userCredential.user;
                 set(ref(database, "Users/"+u.uid),{
                    nome:nome,
                    cognome: cognome,
                    numero: numero,
                    user:user,
                    uid:u.uid,
                    email:u.email,
                    foto:"./css_pages/images/nofoto.jpg",
                    password: encPass(password)
                })
                sendEmail();
                window.location="accesso.html";
                })
                .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                });

            }
            else alert("Please change user");
        })
    }
    else alert("Different value of password, please retry");

    }

   /* export async function Authentication(email,password){
        const db2=ref(database);

        await get(child(db,"Users/")).then((snapshot)=>{
            var password_decripted=null;
            snapshot.forEach((snapchild)=>{
                if(snapchild.val().email==email ){
                    password_decripted = decPass(snapchild.val().password, password)
                }
                else alert('Account not exists!');
            })
        })
        await signInWithEmailAndPassword(auth, email, password_decripted)
            .then((userCredential) => {
            // Signed in 
            const u = userCredential.user;
            if(u.emailVerified){
                 get(child(db2,"Users/"+ u.uid )).then((snapshot)=>{
                    LoginUser(snapshot.val());
                })
            }
            else{
                alert("Please verify your email");
                const bool=window.confirm("Resend email");
                if(bool) {sendEmail(); return;}
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
            window.location="accesso.html";
            });
    }*/
    export async function Authentication(email,password){
        const db2=ref(database);
        var password_decripted=null,f=false;

        await get(child(db2,"Users/")).then((snapshot)=>{
            snapshot.forEach((snapchild)=>{
                if(snapchild.val().email==email ){
                    password_decripted = decPass(snapchild.val().password, password);
                    f=true;
                }
            })
        })
        if(f){
        await signInWithEmailAndPassword(auth, email, password_decripted)
            .then((userCredential) => {
            // Signed in 
            const u = userCredential.user;
            if(u.emailVerified){
                 get(child(db2,"Users/"+ u.uid )).then((snapshot)=>{
                    LoginUser(snapshot.val());
                })
            }
            else{
                alert("Please verify your email");
                const bool=window.confirm("Resend email");
                if(bool) {sendEmail(); return;}
            }
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
            window.location="accesso.html";
            });
    }
    else alert('Not Exists');
    }

    //Salvare dati in locale dopo l'accesso 
    export async function LoginUser(userinfo){
        let keepLog=document.getElementById("stay").checked;
        if(!keepLog){
            sessionStorage.setItem('user', JSON.stringify(userinfo));
            localStorage.setItem('KeepLog','no');
            window.location="profilo.html";
        }
        else{

            localStorage.setItem('KeepLog','yes');
            localStorage.setItem('user', JSON.stringify(userinfo));
            window.location="profilo.html";
        }

    }

    //Profilo
    //Eliminare il proprio account
    
    //Edit

   
    
    export function sendEmail(){
        const auth=getAuth();
        const user=auth.currentUser;
        sendEmailVerification(user).then(() => {
            alert("Please verify your email!");
        })
        .catch((error)=>{
            sendEmail();            
        })
    }

    export function encPass(password){
        var pass12 = CryptoJS.AES.encrypt(password, password);
        //password and key we are providing 
        return pass12.toString();
    }


    export function decPass(dbpass,passlog){
        var pass12=CryptoJS.AES.decrypt(dbpass, passlog);
        return pass12.toString(CryptoJS.enc.Utf8);
    }

    export function openEdit(){
        window.location="edit.html";
    }

        


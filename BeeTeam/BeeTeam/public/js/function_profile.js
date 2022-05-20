import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase,ref, update , get, child ,onChildAdded, orderByChild} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import { getStorage, ref as storef, uploadBytesResumable,getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js";
import { query,getDoc,getFirestore,doc} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";

import { getUser } from "./function_accesso.js";
import {post_creati,post_aderiti,att_richiesta} from "./funzioni_post.js";



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

    const CurrentUser=getUser();
    const commentsRef = query(ref(database, "Attivity"),orderByChild('data'));
    var spazio_post=null;

    export function onload(){
        onChildAdded(commentsRef, (date) => {
            const docRef = doc(fire, "post",date.key);
            getDoc(docRef).then((item) =>{
                const items=item.data();  let dati_utente=date.val();
                if(items.creator==CurrentUser.user) {
                    spazio_post=document.getElementById("spazio_creati");
                    if(items.sub_restanti!=0) post_creati(date.key, spazio_post, dati_utente.type, dati_utente.member, dati_utente.description, items.sub_restanti);
                    else att_richiesta(date.key, spazio_post, dati_utente.type, dati_utente.member, dati_utente.description, items.sub_restanti);
                }
                else if(items.sub.includes(CurrentUser.email)){
                    spazio_post=document.getElementById("spazio_aderiti");
                    post_aderiti(date.key, spazio_post, dati_utente.type, dati_utente.member, dati_utente.anonymous,dati_utente.description, dati_utente.user,items.sub_restanti );
                }
            });
        });
}

    export function sign_Out(){
        sessionStorage.removeItem('user');
        localStorage.removeItem('user');
        localStorage.removeItem('KeepLog');
        window.location="accesso.html";

    };


    var up=null;
    export async function saveData(uid){
        await get(child(ref(database),"Users/"+ uid )).then((snapshot)=>{
            up=snapshot.val();
            let keepLog=localStorage.getItem('KeepLog');

            if(keepLog == "yes"){
                if(up!=null)localStorage.setItem('user', JSON.stringify(up));
            }
            else{
                if(up!=null)sessionStorage.setItem('user', JSON.stringify(up));
            }
        });
    }

    export function editPhoto(f,edit,foto){
        var btnsub=document.createElement("button");
        btnsub.setAttribute("type","submit");
        btnsub.setAttribute("class","btn btn-light btn-sm");
        btnsub.innerHTML="Save";

        modifica_foto.replaceChild(btnsub,edit);
        btnsub.addEventListener('click',function(){updatePhoto(btnsub,f,edit,foto)});
    }

    function updatePhoto(btn,f2,edit,foto){
        const f=f2.files[0];
        if(f==null){
            modifica_foto.replaceChild(edit,btn);
            return;
        }
        const CurrentUser=getUser();
        const metadata = {
            contentType: 'image/'+f.type,
        };
        
        var storageRef= storef(storage, "FotoProfilo/"+ CurrentUser.user);
        uploadBytesResumable(storageRef,f,metadata);

        getDownloadURL(storageRef).then((url) => {
        console.log('File available at', url);
        foto.setAttribute("src",url);
        update(ref(database, "Users/"+CurrentUser.uid),{
                    foto:url,
        });
        })
        .catch((error)=>{
            alert(error);
        })

        modifica_foto.replaceChild(edit,btn);
        saveData(CurrentUser.uid);

    };
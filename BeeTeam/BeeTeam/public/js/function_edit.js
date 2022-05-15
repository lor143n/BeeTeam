import { getFirestore} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import { getDatabase,  ref, update } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAuth,updatePassword, updateEmail} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import { getUser } from "./function_accesso.js";
import { saveData } from "./function_profile.js";



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
    const database=getDatabase(app);
    const auth=getAuth();
    const CurrentUser=getUser();

    export function updatePass(vp){
        const user=auth.currentUser;
            updatePassword(user, vp).then(() => {
                
            }).catch((error) => {
                const errorMessage = error.message;
            });
    }

    export function update_email(new_email){
        const user=auth.currentUser;
        updateEmail(user, new_email).then(() => {
            sendEmail(user);
            user.emailVerified=false;
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);             
        });
    }

    export async function updateUser(uid,novalue,cvalue,nvalue,email_user,vp){

    await update(ref(database, "Users/"+ uid),{
            nome:novalue,
            cognome:cvalue,
            numero:nvalue,
            email:email_user,
            password:vp,
        })
        .catch((error)=>{
            const errorMessage = error.message;
            alert(errorMessage);        
        })
        saveData(uid);

    }
    export async function delUser(us,email){
        const auth = getAuth();
        const user = auth.currentUser;
        const bool=window.confirm="Vuoi eliminare definitivamente l'account?";
        if(bool){
            try{
             getDoc(doc(fire,"users",us)).then((item)=>{
                const dt=item.data();
                if(dt.numero_creati!=0 || dt.aderiti.length!=1){
                    const creati=dt.creati;
                    const aderiti=dt.aderiti;
                    if(creati.length!=1){
                        creati.forEach((post)=>{
                            if(post!=" "){
                                const up={};
                                up['/Attivity/'+post]=null;
                                update(ref(database),up);
                                deleteDoc(doc(fire,"post",post));
                            }

                        })
                    }
                    if(aderiti.length!=1){
                        aderiti.forEach((post)=>{
                            if(post!=" "){
                                updateDoc(doc(fire,"post",post),{
                                sub_restanti:increment(1),
                                sub: arrayRemove(email),
                            })
                        }
                        })
                    }
            }
                
            })
            const up={};
            up['/Users/'+user.uid]=null;
            await update(ref(database),up);
            await deleteDoc(doc(fire,"users",us));

            await deleteUser(user).then(() => {
                alert("Delete User!");
            // window.location="accesso.html";
            }).catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);              
            });
        }
        catch(error){
            const errorMessage = error.message;
            alert(errorMessage);  
        }
        sign_Out();

    }
    }
    export async function saveInfo(nome,cognome,numero,nuova,vecchia,email){
        var i=0;
        var novalue=CurrentUser.nome,  cvalue=CurrentUser.cognome,  nvalue=CurrentUser.numero; 
        var vp=CurrentUser.password, email_user=CurrentUser.email;
        
        if(nome != novalue && nome != "") novalue=nome; i++;
        if(cognome != cvalue && cognome != "") cvalue=cognome; i++;
        if(numero != nvalue && numero != "") nvalue=numero; i++;
        if(nuova != vp && nuova != "") {
            i++;
            if(vp!=vecchia) {alert("La vecchia password non corrisponde!"); return;}
            else{
                if(nuova.length<6){ alert("password troppo corta"); return;}
                else {
                    vp=nuova;
                    updatePass(vp);
                }
            }
        }
        if(email != "") {
            if(email == email_user ){ alert("Same email!"); return;}
            email_user=email; i++;
            update_email(email_user);
        }

        if(i>0){
            await updateUser(CurrentUser.uid,novalue,cvalue,nvalue,email_user,vp);
            window.location="profilo.html";
            i=0;

            }
            else{
                alert("Nessuna modifica");
            }
        }

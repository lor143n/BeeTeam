import { getFirestore} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import { getDatabase,  ref, update } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getAuth,updatePassword, updateEmail} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import { getUser,sendEmail } from "./function_accesso.js";
import { saveData,sign_Out } from "./function_profile.js";



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

    export async function updatePass(vp){
        const user=auth.currentUser;
            await updatePassword(user, vp).then(() => {
                alert("Password modify");
            }).catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                return;
            });
    }

    export async function update_email(new_email){
        const user=auth.currentUser;
        await updateEmail(user, new_email).then(() => {
            sendEmail(user);
            user.emailVerified=false;
            alert("Email modify");
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);  
            return;           
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
            await saveData(uid);

    }
    export async function delUser(us,email){
        const auth = getAuth();
        const user = auth.currentUser;
        const bool=window.confirm="Sure you want permanently delete the account?";
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
            return; 
        }
        sign_Out();

    }
    }
    export async function saveInfo(nomev,cognomev,numerov,nuovav,vecchiav,emailv){
        var i=0;
        var just_info=true;
        var novalue=CurrentUser.nome,  cvalue=CurrentUser.cognome,  nvalue=CurrentUser.numero; 
        var vp=CurrentUser.password, email_user=CurrentUser.email;

        var nome=nomev.val(); var cognome=cognomev.val(); var numero=numerov.val(); var nuova=nuovav.val(); var vecchia=vecchiav.val();var email=emailv.val();
        if(nome != novalue && nome != "") novalue=nome; i++;
        if(cognome != cvalue && cognome != "") cvalue=cognome; i++;
        if(numero != nvalue && numero != "") nvalue=numero; i++;
        if(nuova != vp && nuova != "" ) {
            i++;
            if(vecchia=="") alert("Missing old password")
            else if(vp!=vecchia) { alert("Not match!"); return;}
            else{
                if(nuova.length<6){ alert("Password Too short"); return;}
                else {
                    vp=nuova;
                    updatePass(vp);
                }
            }
            just_info=false;
        }
        if(email != "") {
            if(email == email_user ){ alert("Same email!"); return;}
            email_user=email; i++;
            update_email(email_user);
            just_info=false;
        }

        if(i>0){
            await updateUser(CurrentUser.uid,novalue,cvalue,nvalue,email_user,vp);
            i=0;
            if(just_info) {
                alert("Info modify");
                window.location="profilo.html";
            }
            nomev.attr('value',null); nomev.attr('placeholder',novalue);
            cognomev.attr('value',null); cognomev.attr('placeholder',cvalue);
            emailv.attr('value',null); emailv.attr('placeholder',email_user);
            numerov.attr('value',null); numerov.attr('placeholder',nvalue);
            vecchiav.attr('value',null); 
            nuovav.attr('value',null); 
            
            }
            else{
                alert("Nessuna modifica");
            }
        }
       

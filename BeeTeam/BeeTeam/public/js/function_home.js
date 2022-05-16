import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, set, ref , get, child,push ,onChildAdded,orderByChild,endAt,limitToLast,limitToFirst} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { collection, query, where,getDoc, getDocs,getFirestore, updateDoc,arrayUnion,doc ,setDoc, increment} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js";
import { getUser } from "./function_accesso.js";
import {post_bacheca} from "./funzioni_post.js";


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
    const CurrentUser=getUser();
    let spazio_post=null;
    const commentsRef = query(ref(database, "Attivity"),orderByChild('data'),limitToFirst(4));
    var i=0;

    export function onload(spazio){
        spazio_post=spazio;
        if(spazio_post!=null){
        onChildAdded(commentsRef, (date) => {
            const dR = doc(fire, "post",date.key);
            getDoc(dR).then((item) =>{
            if(i==3) { sessionStorage.setItem("last_position",date.val().id); }
            let data=date.val();
            if(data.complete==false && i!=4) post_bacheca(date.key,spazio_post,data.type, data.member, data.anonymous,data.description,data.user,item.data().sub_restanti);
        })
        }
        );
    }
    }

        


    export async function NewAttivity(member,type,anonymous,description){
        let data=new Date().getTime();
        const post=localStorage.getItem('post');
        const Post=ref(database,"Attivity");
        var newpost=push(Post);
        const key=newpost.key;
        var membri=parseInt(member);
        
        localStorage.setItem('post_totali',parseInt(localStorage.getItem('post_totali')+1));
         
        await setDoc(doc(fire, "post", key), {
               sub:[" "],
               sub_restanti: membri,
               creator: CurrentUser.user,
               category: type
        });
        
        await set(newpost,{

                    anonymous: anonymous,
                    member: membri,
                    type: type,
                    description: description,
                    user: CurrentUser.user,
                    id: key,
                    data : data* -1,
                    complete: false,
                    
        })
         await updateDoc(doc(fire, "users", CurrentUser.user), {
            creati: arrayUnion(key),
            numero_creati: increment(1),
        });
        window.location.reload();
    }

    export function OnSearch(search){
        const q=query(collection(fire,"post"),where("category","==", search) );
        const db2=ref(database);

        while(spazio_post.hasChildNodes()){
               spazio_post.removeChild(spazio_post.firstChild);
            }
               
        getDocs(q).then((doc) => {
            doc.forEach((item)=>{ 
            var data_key=item.id;
            
            get(child(db2,"Attivity/"+data_key)).then((snap)=>{
               var post_data=snap.val();
               var l=spazio_post.childNodes.length;
               let c=null;
               post_bacheca(data_key,spazio_post,c,post_data.type,post_data.member,post_data.anonymous,post_data.description,post_data.user);
            })
            
           })
        })
      

   }

   export function nextPage(){
    const last=sessionStorage.getItem('last_position');
    var page=parseInt(sessionStorage.getItem('page'));
    var total_size=parseInt(sessionStorage.getItem('total_post'))-(3*page);
    page+=1; sessionStorage.setItem('page',page);
    while(spazio_post.hasChildNodes()){
        spazio_post.removeChild(spazio_post.firstChild);
     }
    var q=query(ref(database, "Attivity"),orderByChild('id'),endAt(last),limitToLast(4));
    get(q).then((item)=>{
        if(!item.exists()) {alert("Not Found"); return;}
        var i=0,k=0;
        var limit= (total_size >3 ) ? 0 : -1;
        item.forEach((ogg)=>{
            const c=null; 
            const post_data=ogg.val();
            if(i==limit) {sessionStorage.setItem("last_position",post_data.id); }
           // else att(post_data.id,spazio_post,c,post_data.type,post_data.member,post_data.anonymous,post_data.description,post_data.user);
            i++;
            if(limit==-1 && k!=1){
                alert("No more post!"); k=1;
                next.disabled=true;
            }
            //if(i==total_size-1) return;
        })
    })

}

export function getTotalPost(){
    var total_post=get(query(ref(database, "Attivity")));
    total_post.then((item)=>{
        sessionStorage.setItem('total_post',item.size);
    })
}
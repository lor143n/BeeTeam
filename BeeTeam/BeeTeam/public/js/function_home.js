import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, set, ref , get, child,push ,onChildAdded,orderByChild,endAt,endBefore,startAt,limitToLast,limitToFirst} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
import { collection, query, where,getDoc,orderBy, getDocs,getFirestore, updateDoc,arrayUnion,doc ,setDoc,limit, increment,startAt as st,endAt as et} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
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
    const commentsRef = query(ref(database, "Attivity"),orderByChild('data'),limitToFirst(6));

    export function onload(spazio){
        var i=0;
        spazio_post=spazio;

        const q=query(collection(fire,"post"),orderBy("sub_restanti"),orderBy("data"),where("sub_restanti",">", 0),limit(3));
       
        getDocs(q).then((item1) => {
            item1.forEach((it)=>{
            onChildAdded(ref(database,"Attivity"), (date) => {
            if(date.val().id==it.id){
                alert("id "+it.id+" i: "+i);
                if(i==2) { sessionStorage.setItem("last_position",date.val().id) ; }
                let data=date.val(); i++;
                post_bacheca(date.key, spazio_post, data.type, data.member, data.anonymous, data.description,data.user,it.data().sub_restanti);
            }
        })
       });

   // })
})

    }

        


    export async function NewAttivity(member,type,anonymous,description){
        let data=new Date().getTime();
        const post=localStorage.getItem('post');
        const Post=ref(database,"Attivity");
        var newpost=push(Post);
        const key=newpost.key;
        var membri=parseInt(member);
        const new_data=data*(-1);
        localStorage.setItem('post_totali',parseInt(localStorage.getItem('post_totali')+1));
         
        await setDoc(doc(fire, "post", key), {
               sub:[" "],
               sub_restanti: membri,
               creator: CurrentUser.user,
               category: type,
               data: new_data
        });
        
        await set(newpost,{

                    anonymous: anonymous,
                    member: membri,
                    type: type,
                    description: description,
                    user: CurrentUser.user,
                    id: key,
                    data: new_data
                    
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
               post_bacheca(data_key,spazio_post, post_data.type, post_data.member, post_data.anonymous, post_data.description, post_data.user);
            })
            
           })
        })
      

   }

   async function getTotal(){
       var lh=0;
        const q=query(collection(fire,"post"),where("sub_restanti",">", 0));
       await getDocs(q).then((doc) => {
        lh= doc.size;
        })
        return lh;
   }

   export async function nextPage(){
    if(bk.disabled==true) bk.disabled=false;
/*
    const last=sessionStorage.getItem('last_position');
    var page=parseInt(sessionStorage.getItem('page'));
    var total_size=parseInt(sessionStorage.getItem('total_post'))-(3*page);
    page+=1; sessionStorage.setItem('page',page);
    while(spazio_post.hasChildNodes()){
        spazio_post.removeChild(spazio_post.firstChild);
     }
     var q=null;
    if(total_size >= 3) q=query(ref(database, "Attivity"),orderByChild('id'),endBefore(last),limitToLast(4));
    else {q=query(ref(database, "Attivity"),orderByChild('id'),endAt(last));};

    get(q).then((item)=>{
        if(!item.exists()) {alert("Not Found"); return;}
        var i=0,k=0;
        var limit= (total_size >3 ) ? 0 : -1;
        item.forEach((ogg)=>{
            const post_data=ogg.val();
            if(i==limit) {sessionStorage.setItem("last_position",post_data.id); }
           // else att(post_data.id,spazio_post,c,post_data.type,post_data.member,post_data.anonymous,post_data.description,post_data.user);
            i++;
            if(limit==-1 && k!=1){
                alert("No more post!"); k=1;
                next.disabled=true;
            }
        })
    })
    */
   getTotal();
   const db2=ref(database);
    const last=sessionStorage.getItem('last_position');
    var page=parseInt(sessionStorage.getItem('page'));
    var total_size=parseInt(getTotal)-(3*page);

    page+=1; sessionStorage.setItem('page',page);

    while(spazio_post.hasChildNodes()){
        spazio_post.removeChild(spazio_post.firstChild);
     }

    const postsRef = collection(fire, "post");
    const docSnap = await getDoc(doc(postsRef, last));
    const q=query(postsRef,orderBy("sub_restanti"), orderBy("data"), st(docSnap),limit(3));
    if(!docSnap.exists()) {return;}
    getDocs(q).then((item)=>{
        //if(!item.exists()) {alert("Not Found"); return;}
        var i=0,k=0;
        var limit= (total_size >3 ) ? 2 : -1;
        item.forEach((ogg)=>{

            get(child(db2,"Attivity/"+ogg.id)).then((snap)=>{
               var post_data=snap.val();
            alert(ogg.id);
            if(i==limit) {sessionStorage.setItem("last_position",post_data.id); }
            post_bacheca(post_data.id,spazio_post,post_data.type,post_data.member,post_data.anonymous,post_data.description,post_data.user);
            i++;
            if(limit==-1 && k!=1){
                alert("No more post!"); k=1;
                next.disabled=true;
            }
        })
        })
    })


}


export function backPage(){
    if(next.disabled==true) next.disabled=false;
    const last=sessionStorage.getItem('last_position');

    var page=parseInt(sessionStorage.getItem('page'));
    var total_size=parseInt(sessionStorage.getItem('total_post'))-(3*(page-1));
    page-=1; sessionStorage.setItem('page',page);

    while(spazio_post.hasChildNodes()){
        spazio_post.removeChild(spazio_post.firstChild);
     }
     var q=null;
    if(total_size >= 3) q=query(ref(database, "Attivity"),orderByChild('id'),startAt(last),limitToFirst(4));
    else {q=query(ref(database, "Attivity"),orderByChild('id'),startAt(last));};

    get(q).then((item)=>{
        if(!item.exists()) {alert("Not Found"); return;}
        var i=0,k=0;
        var limit= (total_size >3 ) ? 2 : -1;
        item.forEach((ogg)=>{
            const dR = doc(fire, "post",ogg.key);
            getDoc(dR).then((og) =>{

            const post_data=ogg.val();
            alert(post_data.id);
            if(i==limit) {sessionStorage.setItem("last_position",post_data.id); alert("lasr "+post_data.id)}
            else post_bacheca(post_data.id,spazio_post, post_data.type, post_data.member,post_data.anonymous,post_data.description,post_data.user,og.data().sub_restanti);
            i++;
            if(page==1 && k!=1){
                k=1;
                bk.disabled=true;
            }
        })
        })
    })

}

export function getTotalPost(){
    var total_post=get(query(ref(database, "Attivity")));
    total_post.then((item)=>{
        sessionStorage.setItem('total_post',item.size);
    })
}
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import { getDatabase, set, ref , get, child,push ,onChildAdded,orderByChild,orderByValue,endAt,endBefore,startAt,limitToLast,limitToFirst} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
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
        const commentsRef = query(ref(database, "Attivity"),orderByChild('data'));

        export function onload(spazio){
            var i=0;
            spazio_post=spazio;

            onChildAdded(commentsRef, (date) => {
                const docRef = doc(fire, "post",date.key);
                getDoc(docRef).then((it) =>{
                    let data=date.val(); 
                    if(it.data().sub_restanti>0 && i<4) {
                        if(i==3) { sessionStorage.setItem("last_position",data.data) ;}
                        else post_bacheca(date.key, spazio_post, data.type, data.member, data.anonymous, data.description,data.user,it.data().sub_restanti);
                        i++;
                    }

                })
        })

    // })
    // })

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
            const q=query(collection(fire,"post"),where("category","==", search));
            const db2=ref(database);

            while(spazio_post.hasChildNodes()){
                spazio_post.removeChild(spazio_post.firstChild);
                }
                
            getDocs(q).then((doc) => {
                doc.forEach((item)=>{ 
                    var data_key=item.id;
                    get(child(db2,"Attivity/"+data_key)).then((snap)=>{
                        var post_data=snap.val();                    
                        post_bacheca(data_key,spazio_post, post_data.type, post_data.member, post_data.anonymous, post_data.description, post_data.user);
                    })
                })
            })
        }

    export function getTotalPost(){
        var total_post=get(query(ref(database, "Attivity")));
        var next=document.getElementById('next');
        total_post.then((item)=>{
            sessionStorage.setItem('total_post',item.size);
            if(item.size <= 3) next.disabled=true;
        })
    }

    export async function nextPage(){
        if(bk.disabled==true) bk.disabled=false;
        const last=parseInt(sessionStorage.getItem('last_position'));
        var page=parseInt(sessionStorage.getItem('page'));
        var total_size=parseInt(sessionStorage.getItem('total_post'))-(3*page);
        page+=1; sessionStorage.setItem('page',page);

        while(spazio_post.hasChildNodes()){
            spazio_post.removeChild(spazio_post.firstChild);
        }

        var q=query(ref(database, "Attivity"),orderByChild('data'),startAt(last));
        
        get(q).then((item)=>{
            if(!item.exists()) {alert("Not Found"); return;}
            var i=0,k=0;
            if(item.size <=3) total_size=item.size;
            item.forEach((ogg)=>{
                const post_data=ogg.val();
                const docRef = doc(fire, "post",post_data.id);
                getDoc(docRef).then((it) =>{
                    if(it.data().sub_restanti>0){
                        if((i<3 && i< total_size)){
                            post_bacheca(post_data.id,spazio_post,post_data.type,post_data.member,post_data.anonymous,post_data.description,post_data.user,it.data().sub_restanti);
                            i++;
                        }
                        else if(sessionStorage.getItem("last_position")==last || total_size < 3) {sessionStorage.setItem("last_position",post_data.data);}
            
                    }
                    if((total_size <3 || total_size-3==0) && k!=1){
                        k=1; next.disabled=true;
                    }
                        
                        
                })
            })
        })
                
        }


        export function backPage(){
            if(next.disabled==true) next.disabled=false;
            const last=parseInt(sessionStorage.getItem('last_position'));
        
            var page=parseInt(sessionStorage.getItem('page'));
            page-=1; sessionStorage.setItem('page',page);
        
            var total_size=parseInt(sessionStorage.getItem('total_post'))-(3*(page));
        
            while(spazio_post.hasChildNodes()){
                spazio_post.removeChild(spazio_post.firstChild);
             }
             var q=query(ref(database, "Attivity"),orderByChild('data'),endAt(last));
            get(q).then((item)=>{
                if(!item.exists()) {alert("Not Found"); return;}
                var i=0; var k=0;
                var j=(page==1)?0 : ((page)*3-3);
                item.forEach((ogg)=>{
                    const dR = doc(fire, "post",ogg.key);
                    getDoc(dR).then((og) =>{
                    const post_data=ogg.val();
                        if(og.data().sub_restanti>0 ){
                            if(i>=j && i<j+3) {
                                post_bacheca(post_data.id,spazio_post, post_data.type, post_data.member,post_data.anonymous,post_data.description,post_data.user,og.data().sub_restanti);
                            }
                            if(i>=j+3 && sessionStorage.getItem("last_position")==last ) {sessionStorage.setItem("last_position",post_data.data); }
                            i++;
                            if(page==1 && k!=1){
                                k=1;
                                bk.disabled=true;
                            }
                        
                        }
                    })
                })
            })
        }
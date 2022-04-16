import { collection, query, where, getDoc,addDoc,getFirestore, updateDoc,arrayUnion,doc ,setDoc, increment} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";



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


 export function createElem(id,text,parent){
    var cat=document.createElement("div");
    cat.setAttribute("class","row-mb-1");
    cat.setAttribute("id","cat"+id);
    cat.innerHTML=text;
    parent.appendChild(cat);
    }

export function att(id,parent,c,categoria,numero_persone,check,descrizione,user, key_post){
    c=document.createElement("div");
    c.setAttribute("id",id);
    c.setAttribute("class","box-post-bacheca");

    var user_space=document.createElement("div");
    user_space.setAttribute("class","row");
    user_space.setAttribute("style","padding-bottom: 0.5px");
    if(!check) user_space.innerHTML="<b> User: </b>"+user;
    else user_space.innerHTML="<b> Anonymous </b><br>";
    c.appendChild(user_space);

    const space=document.createElement("div");
    space.setAttribute("class","mb-1");

    createElem("cat"+id,"<b>Categoria: </b>"+categoria,c);
    c.appendChild(space);
    createElem("nump"+id, "<b>Numero di membri richiesti: </b>" + numero_persone,c);
    c.appendChild(space);
    createElem("descrizione"+id, "<b>Descrizione: </b><br>"+ descrizione, c);
    //createElem("disp"+id, "<b>Posizioni disponibili: </b>" + numero_persone,c);
    c.appendChild(space);

    var button=document.createElement("button");
    button.setAttribute("class","btn btn-primary");
    button.setAttribute("style","text-align:center");
    button.innerText="SUB";
    c.appendChild(button);
    
    button.addEventListener('click',function(){loadInfoSub(id)})

    parent.appendChild(c);
    return c;   
}

function loadInfoSub(key){
    var CurrentUser=null;

    let keepLog=localStorage.getItem('KeepLog');

	    if(keepLog == "yes"){
			CurrentUser=JSON.parse(localStorage.getItem('user'));
		}
		else{
			CurrentUser=JSON.parse(sessionStorage.getItem('user'));
		}
    try{
        var value=true;
        const docRef=doc(fire,"post",key);
        const ref= getDoc(docRef).then((snapref)=>{
            if(snapref.data().sub_restanti==0) value=false;
            else if(snapref.data().sub.includes(CurrentUser.user)){
                value=false;
                alert("Already subscribed!");
            }
        })
    if(value){
    updateDoc(doc(fire, "users", CurrentUser.user), {
        aderiti: arrayUnion(key),
    });

    updateDoc(doc(fire, "post", key), {
        sub_restanti: increment(-1),
        sub: arrayUnion(CurrentUser.user)
    });
    alert("Success!");
    };
    }
    catch(e){
        alert(e);
    }
    }

export function att2(id,parent,c,categoria,numero_persone,descrizione,sub ){
    c=document.createElement("div");
    c.setAttribute("id",id);
    c.setAttribute("class","box-post-bacheca");

    const space=document.createElement("div");
    space.setAttribute("class","mb-1");

    createElem("cat"+id,"<b>Categoria: </b>"+categoria,c);
    c.appendChild(space);
    createElem("nump"+id, "<b>Numero di membri richiesti: </b>" + numero_persone,c);
    c.appendChild(space);
    createElem("descrizione"+id, "<b>Descrizione: </b><br>"+ descrizione, c);
    //createElem("disp"+id, "<b>Posizioni disponibili: </b>" + numero_persone,c);
    c.appendChild(space);

    var sub_space=document.createElement("div");
    sub_space.setAttribute("class","row");
    sub_space.setAttribute("style","padding-bottom: 0.5px");
    sub_space.innerHTML="<b>Posti disponibili: <b>"+sub+"</b>";
    c.appendChild(sub_space);



    parent.appendChild(c);
    return c;   
}

export function att_sub(id,parent,c,categoria,numero_persone,check,descrizione,user,sub){
    c=document.createElement("div");
    c.setAttribute("id",id);
    c.setAttribute("class","box-post-bacheca");


    var user_space=document.createElement("div");
    user_space.setAttribute("class","row");
    user_space.setAttribute("style","padding-bottom: 0.5px");
    if(!check) user_space.innerHTML="<b> User: </b>"+user;
    else user_space.innerHTML="<b> Anonymous </b><br>";
    c.appendChild(user_space);

    const space=document.createElement("div");
    space.setAttribute("class","mb-1");

    createElem("cat"+id,"<b>Categoria: </b>"+categoria,c);
    c.appendChild(space);
    createElem("nump"+id, "<b>Numero di membri richiesti: </b>" + numero_persone,c);
    c.appendChild(space);
    createElem("descrizione"+id, "<b>Descrizione: </b><br>"+ descrizione, c);
    //createElem("disp"+id, "<b>Posizioni disponibili: </b>" + numero_persone,c);
    c.appendChild(space);

    var sub_space=document.createElement("div");
    sub_space.setAttribute("class","row");
    sub_space.setAttribute("style","padding-bottom: 0.5px");
    sub_space.innerHTML="<b>Posti disponibili: <b>"+sub+"</b>";
    c.appendChild(sub_space);



    parent.appendChild(c);
    return c;   
}

import { collection, query, where, getDoc,addDoc,getFirestore, updateDoc,arrayUnion,doc ,setDoc, increment} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js";
import * as email from "https://smtpjs.com/v3/smtp.js";


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
//pressione del load e aggiornamento delle caselle relative a post e utente
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
        sub: arrayUnion(CurrentUser.email)
    });
    alert("Success!");
    };
    }
    catch(e){
        alert(e);
    }
    }

    //format per post creati in profilo

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
//post aderiti in profilo
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

export function att_richiesta(id,parent,c,categoria,numero_persone,descrizione,sub){
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
    c.appendChild(space);

    var sub_space=document.createElement("div");
    sub_space.setAttribute("class","row");
    sub_space.setAttribute("style","padding-bottom: 0.5px");
    sub_space.innerHTML="<b>Posti disponibili: <b>"+sub+"</b>";
    c.appendChild(sub_space);

    var button=document.createElement("button");
    button.setAttribute("class","btn btn-primary");
    button.setAttribute("style","text-align:center");
    button.innerText="Show Contact";
    c.appendChild(button);
    
    button.addEventListener('click',function(){show_sub(id,parent,c)});



    parent.appendChild(c);
    return c;   
}


function GenerateEmail(id,parent,c){
    show_sub(id,parent,c);
}

export function show_sub(id,parent,c){
    var child=c;
    parent.removeChild(c);
    c=document.createElement("div");
    c.setAttribute("class","box-post-bacheca; scroll");
    var inserito=false;
    const docRef = doc(fire, "post",id);
	getDoc(docRef).then((item) =>{
        var items=item.data()
        var array_sub=items.sub;
         var x;
         for(let elem of array_sub){
             x=document.createElement("div");
             x.setAttribute("class","row-mb-3");
             x.innerText=elem;
             c.appendChild(x);
             x=null;
         }
         inserito=true;

    })
    while(!inserito){}
    
    var button=document.createElement("button");
    button.setAttribute("class","btn btn-primary btn-sm");
    button.setAttribute("style","text-align:center");
    button.innerText="Hide";
    c.appendChild(button);
    
    button.addEventListener('click',function(){hideContact(child,c,parent)});

    parent.appendChild(c);
    return c;   
}

function hideContact(child,c,parent){
    parent.removeChild(c);
    parent.appendChild(child);
}

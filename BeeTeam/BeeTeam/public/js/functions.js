import { getDoc,getFirestore, updateDoc,arrayUnion,doc , increment,deleteDoc,arrayRemove} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-firestore.js";
import { getDatabase, set, ref, update , get, child,onValue ,onChildAdded, orderByKey,remove} from "https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js";
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
 const database=getDatabase(app);


 export function createElem(id,text,parent){
    var cat=document.createElement("div");
    cat.setAttribute("class","row-mb-1");
    cat.setAttribute("id","cat"+id);
    cat.setAttribute("style"," color: #ffbf00c1")
    cat.innerHTML=text;
    parent.appendChild(cat);
    }
//bacheca
export function att(id,parent,c,categoria,numero_persone,check,descrizione,user, key_post){
    c=document.createElement("div");
    c.setAttribute("id",id);
    c.setAttribute("class","box-activity");

    var user_space=document.createElement("div");
    user_space.setAttribute("class","row");
    user_space.setAttribute("style","padding-bottom: 0.5px");
    if(!check) user_space.innerHTML="<b> User: </b>"+user;
    else user_space.innerHTML="<b> Anonymous </b><br>";
    c.appendChild(user_space);

    const space=document.createElement("div");
    space.setAttribute("class","mb-1");

    createElem("cat"+id,"<b>Categoria: </b>"+ categoria,c);
    c.appendChild(space);
    createElem("nump"+id, "<b>Numero di membri richiesti: </b>" + numero_persone,c);
    c.appendChild(space);
    createElem("descrizione"+id, "<b>Descrizione: </b><br>"+ descrizione, c);
    //createElem("disp"+id, "<b>Posizioni disponibili: </b>" + numero_persone,c);
    c.appendChild(space);

    var button=document.createElement("button");
    button.setAttribute("class","btn btn-light btn-sm");
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
    var bool=false;
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
        getDoc(docRef).then((snapref)=>{
            if(snapref.data().sub_restanti==0) value=false;
            else if(snapref.data().sub.includes(CurrentUser.user)){
                value=false;
                alert("Already subscribed!");
            }
        })
    if(value){
    	const docRef = doc(fire, "post",key);
		getDoc(docRef).then((item) =>{
            var sub_restanti= item.data().sub_restanti;
            if(sub_restanti-1==0)  bool=true;

        })
    updateDoc(doc(fire, "users", CurrentUser.user), {
        aderiti: arrayUnion(key),
        complete:bool,
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
    
    const dele =document.createElement("img");
    dele.setAttribute("width","5%");
    dele.setAttribute("style","border-radius:30%;");
    dele.setAttribute("src","rubbish.jpg");
    c.appendChild(dele);
    c.appendChild(space);
    c.appendChild(space);

    dele.addEventListener('click',function(){onDelete(id,parent,c)});


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

    var button=document.createElement("button");
    button.setAttribute("class","btn btn-light btn-sm");
    button.setAttribute("style","text-align:center");
    button.innerText="Remove sub";
    c.appendChild(button);
    button.addEventListener('click',function(){deleteSub(id,parent,c)});

    parent.appendChild(c);
    return c;   
}

function deleteSub(id,parent,c){
   const richiesta= window.confirm("Sicuro di voler eliminare l'adesione");
   if(richiesta){
    let keepLog=localStorage.getItem('KeepLog');
    var CurrentUser=null;

	    if(keepLog == "yes"){
			CurrentUser=JSON.parse(localStorage.getItem('user'));
		}
		else{
			CurrentUser=JSON.parse(sessionStorage.getItem('user'));
		}
    try{
    updateDoc(doc(fire, "post", id), {
        sub_restanti: increment(+1),
        sub: arrayRemove(CurrentUser.email)
    });
    parent.removeChild(c);

  }
  catch(e){
      alert(e);
  }
}
}


export function att_richiesta(id,parent,c,categoria,numero_persone,descrizione,sub){
    c=document.createElement("div");
    c.setAttribute("id",id);
    c.setAttribute("class","box-post-bacheca");

    const space=document.createElement("div");
    space.setAttribute("class","mb-1");

    const dele =document.createElement("img");
    dele.setAttribute("width","5%");
    dele.setAttribute("style","border-radius:30%; color:#ffbf00c1");
    //dele.innerText="Delect";
    dele.setAttribute("src","rubbish.jpg");
    c.appendChild(dele);
    dele.addEventListener('click',function(){onDelete(id,parent,c)});


    c.appendChild(space);
    c.appendChild(space);


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
    button.setAttribute("class","btn btn-light btn-sm");
    button.setAttribute("style","text-align:center");
    button.innerText="Show Contact";
    c.appendChild(button);
    
    button.addEventListener('click',function(){show_sub(id,parent,c)});



    parent.appendChild(c);
    return c;   
}


export function show_sub(id,parent,c){
    var child=document.createElement("box-post-bacheca");
    var box=document.createElement("box-post");
    child.appendChild(box);
    const docRef = doc(fire, "post",id);
	getDoc(docRef).then((item) =>{
        var items=item.data()
        var array_sub=items.sub;
         var x;
         for(let elem of array_sub){
             x=document.createElement("div");
             x.setAttribute("class","row-mb-3");
             x.innerText=elem;
             box.appendChild(x);
             x=null;
         }
    })
    var button=document.createElement("button");
    button.setAttribute("class","btn btn-primary btn-sm");
    button.setAttribute("style","text-align:center");
    button.innerText="Hide";
    child.appendChild(button);
    button.addEventListener('click',function(){hideContact(child,c,parent)});
    parent.replaceChild(child,c);
    return c;   
}

function hideContact(child,c,parent){
    parent.replaceChild(c,child);
}


function onDelete(id,parent,c){
    const richiesta=window.confirm("Elimina post");
    if (richiesta){
    parent.removeChild(c);
    const up={}
    up['/Attivity/'+id]=null;
    update(ref(database),up);
    deleteDoc(doc(fire,"post",id));
    }
}
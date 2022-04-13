
export function att(id,parent,c,categoria,numero_persone,check, user){
    c=document.createElement("div");
    c.setAttribute("id",id);
    c.setAttribute("class","box-post-bacheca");

    var user_space=document.createElement("div");
    user_space.setAttribute("class","row");
    user_space.setAttribute("style","padding-bottom: 0.5px");
    if(!check) user_space.innerHTML="<b>User: </b>"+user;
    else user_space.innerHTML="<b> Anonymous </b><br>";
    c.appendChild(user_space);

    const space=document.createElement("div");
    space.setAttribute("class","mb-1");

    createElem("cat"+id,"<b>Categoria: </b>"+categoria,c);
    c.appendChild(space);
    createElem("nump"+id, "<b>Numero di membri richiesti: </b>" + numero_persone,c);
    c.appendChild(space);
    createElem("descrizione"+id, "<b>Descrizione: </b><br>"+ description.value, c);
    //createElem("disp"+id, "<b>Posizioni disponibili: </b>" + numero_persone,c);
    c.appendChild(space);
    parent.appendChild(c);
    return c;   
}


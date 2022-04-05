
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

var initialize=false;

export function openProfile(){
    alert("ok");
        alert("Connect!");
        window.location.href="profilo.html";
        let c1= document.getElementById("c1");
        c1.innerHTML=" <b> CIAO </b>";
        initialize=false;
}
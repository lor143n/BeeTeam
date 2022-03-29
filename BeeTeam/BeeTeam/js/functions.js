function edit(){
    
}
function modpw(){
    var pass=document.getElementById("pw").ariaValueNow;
    if(pass.length < 6 ){
        alert("La password deve contenere almeno 6 caratteri");
    }
};
function Registrazione(){
    if(isNan(document.getElementById("numero"))){
        alert("Il numero di telefono non può contenere lettere");
        window.open("accesso.html");
        return false;
    }
    var pass=document.getElementById("pw").ariaValueNow;
    if(pass.length < 2 ){
        alert("La password deve contenere almeno 6 caratteri");
    }
    window.open("accesso.html");
     alert("Grazie per la registrazione!");
     return true;
  
};

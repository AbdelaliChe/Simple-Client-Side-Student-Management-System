//CHENTOUI ABDELALI

//////////////////////GererNom
let nom = document.getElementById("nom");

 let validateNom = function(){
    if(nom.value.length < 2){
        return false;
    }
    return true;
}

nom.addEventListener("blur", function(e){ 
    if(validateNom()===true){
        nom.className="success";
    }else{
        nom.className="failed";
    }
 });

//////////////////////GerePrenom
let pre = document.getElementById("prenom");

let validatePre = function(){
    if(pre.value.length < 2){
        return false;
    }
    return true;
}

pre.addEventListener("blur", function(e){ 
    if(validatePre()===true){
        pre.className="success";
    }else{
        pre.className="failed";
    }
 });

//////////////////////GererFiliere
let filiere = document.getElementById("filiere");

let validateFil = function(){
    if(filiere.value.length < 3){
        return false;
    }
    return true;
}

filiere.addEventListener("blur", function(e){ 
    if(validateFil()===true){
        filiere.className="success";
    }else{
        filiere.className="failed";
    }
 });

//////////////////////GererDate
let dateN = document.getElementById("dateNaissance");

let validateD = function(){
    let d = new Date();
    if(new Date(new Date().getFullYear()-new Date(dateN.value).getFullYear()) >= 18){
        return true;
    }
    return false;
}

dateN.addEventListener("blur", function(e){ 
    if(validateD()===true){
        dateN.className="success";
    }else{
        dateN.className="failed";
    }
 });

//////////////////////GererEmail
let email = document.getElementById("email");

email.className="";
function emailValide(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

email.addEventListener("blur", function(e){ 
    if(emailValide(email.value)===true){
        email.className="success";
    }else{
        email.className="failed";
    }
 });
  
//////////////////////GererTel
let tel = document.getElementById("tel");

function telValide(tel) {
    const regex = /^06\d{8}$/;
    return regex.test(tel);
  }
tel.addEventListener("blur", function(e){ 
    if(telValide(tel.value)===true){
        tel.className="success";
    }else{
        tel.className="failed";
    }
 });

 ////////////////////////////GererNOTE

let addN = document.getElementById("ajouterNote");
let d= note1;
let ourDiv = note1.parentElement;
let ourInputs = ourDiv.getElementsByTagName("input");

let createNote = function(id){
    let suppB=document.createElement("BUTTON");
    suppB.setAttribute("type","button");
    suppB.setAttribute("id",`suppNote${id}`);
    suppB.style.background="red";
    suppB.appendChild(document.createTextNode("x"));

    suppB.addEventListener("click",function(e){
        suppB.parentElement.remove();
        moyenne.value=calculeMoy()/ourInputs.length;
        d=ourInputs[ourInputs.length-1];
    })

    let inp=document.createElement("INPUT");
    inp.setAttribute("type","number");
    inp.setAttribute("name","note");
    inp.setAttribute("id",`note${id}`);
    inp.style.width="70px";

    let newDiv = document.createElement("div");
    newDiv.setAttribute("id",`div${id}`);

    newDiv.appendChild(inp);
    newDiv.appendChild(suppB);
    addN.before(newDiv);
}

addN.disabled=false;

let newNote = 2;

//gerer button add + note
addN.addEventListener("click",function(e){
    if (ourDiv.childElementCount < 6 && d.value !== "" && parseFloat(d.value)>-1 && parseFloat(d.value)<21) {
        createNote(newNote);
        d=document.getElementById(`note${newNote}`);
        newNote++;
    }
})

let calculeMoy=function(){
    let s=0;
    for(let i = 0; i < ourInputs.length; i++){
        if(!isNaN(parseFloat(ourInputs[i].value))){
            s += parseFloat(ourInputs[i].value);
        }
    }
    return s;
}

//modification du moyen dependant du input
ourDiv.addEventListener("input",function(e){
    moyenne.value=calculeMoy()/ourInputs.length;
})

let noteValidate = function(){
    let valide=false;
    if(ourInputs.length===4) valide=true;
    for(let i = 0; i < ourInputs.length; i++){
        if(ourInputs[i].value === "" || parseFloat(ourInputs[i].value)<=-1 || parseFloat(ourInputs[i].value)>20){
            valide = false;
            break;
        }
    }
    return valide;
}

//////////////////////GererAjout

//setEtudiants -> utilisantt localStorage

//get Etudiant from local Storage si exists
let Etudiants = JSON.parse(localStorage.getItem("Etudiants")) || [];

let notes=[];
let setEtudiant = function(){
    //getnotes & ajout au notes
    for(let i = 0; i < ourInputs.length; i++){
        notes.push(ourInputs[i].value);
    }

    //Etudiant obj
    let Etudiant = {
        nom: nom.value,
        prenom: pre.value,
        date: dateN.value,
        email: email.value,
        filiere: filiere.value,
        telephone: tel.value,
        notes: notes,
        moyenne: moyenne.value,
    };

    //ajout Etudiant -> Etudiants
    Etudiants.push(Etudiant);
    //ajout Etudiants -> localStorage
    localStorage.setItem("Etudiants", JSON.stringify(Etudiants));
}

//////////////////////gestion table Etudiant

let tableGestion = function(){
    let tab= document.getElementById("tableEtudiants");
    let tbody = tab.querySelector("tbody");
    tbody.children[0].remove();
    //set Etudiants existants -> table
    for(let etd of Etudiants){
        let newEtd = `<tr>
        <td>${etd.nom}</td>
        <td>${etd.prenom}</td>
        <td>${etd.date}</td>
        <td>${etd.filiere}</td>
        <td>${etd.email}</td>
        <td>${etd.telephone}</td>
        <td>${etd.notes}</td>
        <td>${etd.moyenne}</td>
        <td>
            <button class="modifier">Modifier</button> <!-- Bouton Modifier -->
            <button class="supprimer">Supprimer</button> <!-- Bouton Supprimer -->
        </td>
        </tr>`
        tbody.insertAdjacentHTML("beforeend",newEtd);
    }
    //2 fcts qui gerent les buttons supprimer et modifier etd
    suppButton();
    modifButton();

}

let suppButton = function(){
    let sup = document.getElementsByClassName("supprimer");
    //ajouter a tt button supprimer click event
    for(let s of sup){
        s.addEventListener("click",function(e){
            let conf=confirm(`Vous voulez supprimer ${s.parentElement.parentElement.children[0].textContent} ??`);
            if(conf===true){
                if (s.parentElement.parentElement.rowIndex-1 > -1) {
                    Etudiants.splice(s.parentElement.parentElement.rowIndex-1,1);
                    localStorage.setItem("Etudiants", JSON.stringify(Etudiants));
                    s.parentElement.parentElement.remove();
                }
            }
        })
    }
}

//etat pour gerer button cree ou modifier etd
let etat="creeSubmit";
let submit=document.querySelector("input[type=submit]");
submit.value="CREER";

let modifIndice;
let modifButton = function(){
    let mod = document.getElementsByClassName("modifier");
    //ajouter a tt button modifier click event
    for(let m of mod){
        m.addEventListener("click",function(e){
            newNote=2;
            nom.value=m.parentElement.parentElement.children[0].textContent;
            pre.value=m.parentElement.parentElement.children[1].textContent;
            dateN.value=m.parentElement.parentElement.children[2].textContent;
            filiere.value=m.parentElement.parentElement.children[3].textContent;
            email.value=m.parentElement.parentElement.children[4].textContent;
            tel.value=m.parentElement.parentElement.children[5].textContent;
            note1.value = m.parentElement.parentElement.children[6].textContent.split(",")[0];
            //supprimer les notes si deja existantes
            for(let i=2;i<5;i++){
                if(ourDiv.childElementCount>3){
                    d=document.getElementById(`div${i}`);
                    d.remove();
                }
            }
            //ajouter new notes
            for(let i = 1; i < 4; i++){
                if (ourDiv.childElementCount < 6) {
                    createNote(newNote);
                    d=document.getElementById(`note${newNote}`);
                    d.value = m.parentElement.parentElement.children[6].textContent.split(",")[i];
                    newNote++;
                }
            }
            moyenne.value=m.parentElement.parentElement.children[7].textContent;

            //stock indice etd a modifier
            modifIndice=m.parentElement.parentElement.rowIndex-1;
            //changement d etat
            etat="modifSubmit";
            submit.value="MODIFIER";
            //fct pout new button -> retourner au creation
            if(!document.getElementById("retourner")){
                returnCreer();
            }
        })
    }
}

//utiliser si on veut modifier un etd
let modifSubmit=function(i){
    for(let i = 0; i < ourInputs.length; i++){
        notes.push(ourInputs[i].value);
    }
    let modifEtudiant = {
        nom: nom.value,
        prenom: pre.value,
        date: dateN.value,
        email: email.value,
        filiere: filiere.value,
        telephone: tel.value,
        notes: notes,
        moyenne: moyenne.value,
    };
    if(i>-1){
        //update list Etudiants et aussi dans localStorage
        Etudiants[i]=modifEtudiant;
        localStorage.setItem("Etudiants", JSON.stringify(Etudiants));
    }
}

//fct cree et gere le button retourner au mode creation
let returnCreer=function(){
    let returnCree = document.createElement("button");
    returnCree.textContent="Retourner au Creation";
    returnCree.setAttribute("id","retourner")
    returnCree.style.display= "block";
    returnCree.style.marginLeft= "auto";
    returnCree.style.marginRight= "auto";
    form.after(returnCree);
    returnCree.addEventListener("click",function(e){
        let confirmCreer=confirm(`Vous voulez recreer cet Etudiant??`);
        if(confirmCreer===false){
            nom.value="";
            pre.value="";
            dateN.value="";
            filiere.value="";
            email.value="";
            tel.value="";
            note1.value ="";
            //supprimer les notes si deja existantes
            for(let i=2;i<5;i++){
                if(ourDiv.childElementCount>3){
                    d=document.getElementById(`div${i}`);
                    d.remove();
                }
            }
            d=note1;
            newNote=2;
            moyenne.value="";
        }
        etat="creeSubmit";
        submit.value="CREER";
        returnCree.remove();
    })
}

//appel fct qui gere tt table
tableGestion();

/////////////////////Form

let form = document.getElementById('formEtudiant');

form.addEventListener("copy", function(e){
    e.preventDefault();
});

form.addEventListener("paste", function(e){
    e.preventDefault();
});

form.addEventListener("cut", function(e){
    e.preventDefault();
});

form.addEventListener("submit", function(e){ 
    e.preventDefault();
    if(validateNom()===true && validatePre()===true && validateFil()===true && telValide(tel.value)===true
    && emailValide(email.value)==true && validateD()===true && noteValidate()===true){
        if(etat==="creeSubmit"){
            setEtudiant(); 
        }else if(etat==="modifSubmit"){
            modifSubmit(modifIndice);
        }
        form.submit(); 
    }else{
        alert("Un ou + champs non valides!!!!!");
    }
});

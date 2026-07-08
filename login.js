/*
=========================================
RETRO NET
LOGIN.JS
Versão 2.0
=========================================
*/


// ==============================
// LOGIN
// ==============================

async function login(){

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value;


    if(username==="" || password===""){

        alert("Preencha todos os campos.");

        return;

    }


    let email;


    if(username==="ProblematicKid2702"){

        email="ProblematicKid2702@retronet.com";

    }

    else{

        email=username+"@retronet.com";

    }


    const {error} =
    await supa.auth.signInWithPassword({

        email:email,

        password:password

    });


    if(error){

        alert("Usuário ou senha incorretos.");

        console.log(error);

        return;

    }


    window.location.href="index.html";

}



// ==============================
// CRIAR CONTA
// ==============================

async function register(){


    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value;


    if(username==="" || password===""){

        alert("Preencha tudo.");

        return;

    }


    const email =
    username+"@retronet.com";


    const {data,error} =
    await supa.auth.signUp({

        email:email,

        password:password

    });


    if(error){

        alert(error.message);

        return;

    }


    await supa

    .from("profiles")

    .insert({

        id:data.user.id,

        username:username,

        bio:"",

        admin:username==="ProblematicKid2702"

    });


    alert("Conta criada!");

}



// ==============================
// GUEST
// ==============================

function guestLogin(){

    localStorage.setItem(

        "guest",

        "true"

    );

    window.location.href="index.html";

}



// ==============================
// SAIR
// ==============================

async function logout(){

    localStorage.removeItem(

        "guest"

    );


    await supa.auth.signOut();

    window.location.href="login.html";

}



// ==============================
// VERIFICAR LOGIN
// ==============================

async function checkLogin(){


    const guest =
    localStorage.getItem("guest");


    if(guest){

        return;

    }


    const {data} =
    await supa.auth.getUser();


    if(data.user){

        window.location.href="index.html";

    }


}



// ==============================
// BOTÕES
// ==============================

document.addEventListener(

"DOMContentLoaded",

()=>{


    const loginButton =
    document.getElementById("loginButton");

    if(loginButton){

        loginButton.onclick=login;

    }


    const registerButton =
    document.getElementById("registerButton");

    if(registerButton){

        registerButton.onclick=register;

    }


    const guestButton =
    document.getElementById("guestButton");

    if(guestButton){

        guestButton.onclick=guestLogin;

    }


});

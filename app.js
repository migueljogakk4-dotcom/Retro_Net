/*
================================================
RETRO NET
app.js
Versão sem Firebase
================================================
*/


// ================================
// CONFIGURAÇÃO
// ================================

const USERS_FILE = "users.json";
const POSTS_FILE = "posts.json";

let users = [];
let posts = [];

let currentUser = null;


// ================================
// INICIALIZAÇÃO
// ================================

document.addEventListener("DOMContentLoaded", () => {

    loadSession();

    loadUsers();

    loadPosts();

    updateUserUI();

});


// ================================
// CARREGAR USUÁRIOS
// ================================

async function loadUsers(){

    try{

        const response = await fetch(USERS_FILE);

        users = await response.json();

        console.log("Usuários carregados:", users);

    }

    catch(error){

        console.log("Erro carregando usuários:", error);

    }

}


// ================================
// CARREGAR POSTS
// ================================

async function loadPosts(){

    try{

        const response = await fetch(POSTS_FILE);

        posts = await response.json();

        console.log("Posts carregados:", posts);

        showPosts();

    }

    catch(error){

        console.log("Erro carregando posts:", error);

    }

}


// ================================
// LOGIN
// ================================

function login(){

    const username =
    document.getElementById("username").value;


    const password =
    document.getElementById("password").value;


    const user = users.find(u =>

        u.username === username &&
        u.password === password

    );


    if(user){

        currentUser = user;


        localStorage.setItem(

            "retro_session",

            JSON.stringify(user)

        );


        alert("Login realizado!");


        window.location.href =
        "index.html";


    }

    else{


        alert("Usuário ou senha incorretos.");


    }

}


// ================================
// SAIR
// ================================

function logout(){


    localStorage.removeItem(
        "retro_session"
    );


    currentUser = null;


    window.location.href =
    "login.html";


}


// ================================
// RESTAURAR LOGIN
// ================================

function loadSession(){


    const saved =
    localStorage.getItem(
        "retro_session"
    );


    if(saved){

        currentUser =
        JSON.parse(saved);

    }

}


// ================================
// MOSTRAR USUÁRIO
// ================================

function updateUserUI(){


    const area =
    document.getElementById(
        "userArea"
    );


    if(!area) return;


    if(currentUser){


        area.innerHTML = `

        <p>
        Olá, ${currentUser.username}!
        </p>

        <button onclick="logout()">
        Sair
        </button>

        `;


    }

    else{


        area.innerHTML = `

        <a href="login.html">
        Login
        </a>

        `;


    }


}


// ================================
// BLOG
// ================================

function showPosts(){


    const container =
    document.getElementById(
        "posts"
    );


    if(!container) return;


    container.innerHTML = "";


    posts.forEach(post =>{


        container.innerHTML += `

        <div class="card">

            <h2>
            ${post.titulo}
            </h2>


            <p>
            ${post.texto}
            </p>


            <small>
            Por ${post.autor}
            </small>


        </div>

        `;


    });


}

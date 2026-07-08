/*
===========================================
RETRO NET
APP.JS
Versão 2.0
===========================================
*/

let currentUser = null;


// ================================
// INICIAR
// ================================

document.addEventListener("DOMContentLoaded", async () => {

    await restoreSession();

    updateUserArea();

    showProfile();

    showAdminPanel();

});



// ================================
// RESTAURAR SESSÃO
// ================================

async function restoreSession(){

    const { data } =
    await supa.auth.getUser();

    currentUser = data.user;

}



// ================================
// PEGAR PERFIL
// ================================

async function getProfile(){

    if(!currentUser){

        return null;

    }

    const { data, error } =
    await supa

    .from("profiles")

    .select("*")

    .eq("id", currentUser.id)

    .single();


    if(error){

        return null;

    }


    return data;

}



// ================================
// ÁREA DO USUÁRIO
// ================================

async function updateUserArea(){

    const area =
    document.getElementById("userArea");

    if(!area){

        return;

    }


    if(!currentUser){

        area.innerHTML = `

        <a href="login.html">

            LOGIN

        </a>

        `;

        return;

    }


    const profile =
    await getProfile();


    area.innerHTML = `

    <p>

        👤 ${profile?.username || currentUser.email}

    </p>

    <button onclick="logout()">

        SAIR

    </button>

    `;

}



// ================================
// PERFIL
// ================================

async function showProfile(){

    const profileDiv =
    document.getElementById("profile");


    if(!profileDiv){

        return;

    }


    if(!currentUser){

        profileDiv.innerHTML = `

        <div class="card">

            Faça login.

        </div>

        `;

        return;

    }


    const profile =
    await getProfile();


    profileDiv.innerHTML = `

    <div class="card">

        <h2>

            ${profile.username}

        </h2>

        <p>

            ${profile.bio || "Sem bio."}

        </p>

        <button onclick="editBio()">

            Editar Bio

        </button>

    </div>

    `;

}



// ================================
// EDITAR BIO
// ================================

async function editBio(){

    const profile =
    await getProfile();

    if(!profile){

        return;

    }


    const novaBio =
    prompt(

        "Digite sua nova bio:",

        profile.bio || ""

    );


    if(novaBio === null){

        return;

    }


    await supa

    .from("profiles")

    .update({

        bio:novaBio

    })

    .eq(

        "id",

        currentUser.id

    );


    showProfile();

}



// ================================
// ADMIN
// ================================

function isAdmin(){

    if(!currentUser){

        return false;

    }

    return currentUser.email ===
    "ProblematicKid2702@retronet.com";

}



// ================================
// PAINEL ADMIN
// ================================

function showAdminPanel(){

    const panel =
    document.getElementById("adminPanel");

    if(!panel){

        return;

    }


    if(!isAdmin()){

        panel.innerHTML = "";

        return;

    }


    panel.innerHTML = `

    <div class="card">

        <h2>

            PAINEL ADMIN

        </h2>

        <button onclick="window.location='blog.html'">

            GERENCIAR POSTS

        </button>

    </div>

    `;

}



// ================================
// LOGOUT
// ================================

async function logout(){

    await supa.auth.signOut();

    window.location.href = "login.html";

}

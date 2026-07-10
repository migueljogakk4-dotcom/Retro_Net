/*
==========================================
RETRO NET
BLOG.JS V2
PARTE 1
==========================================
*/

let posts = [];

// ==========================
// CARREGAR POSTS
// ==========================

async function loadPosts(){

    const container = document.getElementById("posts");

    if(!container) return;

    container.innerHTML = `
        <div class="card">
            Carregando posts...
        </div>
    `;

    const { data, error } = await supa
        .from("posts")
        .select(`
            id,
            title,
            content,
            likes,
            created_at,
            author,
            profiles (
                username
            )
        `)
        .order("created_at", { ascending:false });

    if(error){

        console.error(error);

        container.innerHTML = `
            <div class="card">
                <h2>Erro ao carregar posts</h2>
                <p>${error.message}</p>
            </div>
        `;

        return;

    }

    posts = data || [];

    renderPosts();

}



// ==========================
// MOSTRAR POSTS
// ==========================

function renderPosts(){

    const container = document.getElementById("posts");

    if(!container) return;

    container.innerHTML = "";

    if(posts.length === 0){

        container.innerHTML = `
            <div class="card">
                <h2>Nenhum post ainda.</h2>
            </div>
        `;

        return;

    }

    posts.forEach(post=>{

        const username =
            post.profiles?.username ||
            "Usuário";

        container.innerHTML += `

        <div class="card">

            <h2>${post.title}</h2>

            <p>${post.content}</p>

            <small>
                👤 ${username}
            </small>

            <br><br>

            <button onclick="likePost('${post.id}')">
                ❤️ ${post.likes || 0}
            </button>

            <br><br>

            <div id="comments-${post.id}"></div>

            <input
                id="comment-${post.id}"
                placeholder="Comentário..."
            >

            <button onclick="addComment('${post.id}')">
                Enviar
            </button>

        </div>

        `;

        loadComments(post.id);

    });

}



// ==========================
// CRIAR POST
// ==========================

async function createPost(){

    const title =
        document.getElementById("postTitle").value.trim();

    const content =
        document.getElementById("postText").value.trim();

    if(!title || !content){

        alert("Preencha todos os campos.");

        return;

    }

    const { data:userData } =
        await supa.auth.getUser();

    if(!userData.user){

        alert("Faça login.");

        return;

    }

    const { error } = await supa
        .from("posts")
        .insert({

            author:userData.user.id,

            title,

            content,

            likes:0

        });

    if(error){

        alert(error.message);

        console.error(error);

        return;

    }

    document.getElementById("postTitle").value = "";
    document.getElementById("postText").value = "";

    await loadPosts();

}



// ==========================
// INICIAR
// ==========================

document.addEventListener(

"DOMContentLoaded",

()=>{

    loadPosts();

});

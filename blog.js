// BLOG.JS V3C 


alert("RetroNet blog.js V3C carregado!");

let posts = [];

async function loadPosts(){

const container = document.getElementById("posts");

if(!container) return;

container.innerHTML = `

<div class="card"> Carregando posts... </div> `;

const { data, error } = await supa
.from("posts")
.select("*")
.order("created_at", { ascending:false });

if(error){

container.innerHTML = `

<div class="card"> Erro ao carregar posts: <br> ${error.message} </div> `;

console.error(error);

return;

}

posts = data || [];

renderPosts();

}

function renderPosts(){

const container = document.getElementById("posts");

if(!container) return;

container.innerHTML = "";

if(posts.length === 0){

container.innerHTML = `

<div class="card"> Nenhum post ainda. </div> `;

return;

}

posts.forEach(post=>{

container.innerHTML += `

<div class="card"> <h2>${post.title}</h2> <p>${post.content}</p> <small> 👤 ${post.author || "Usuário"} </small>

<br><br>

<button onclick="likePost('${post.id}')"> ❤️ ${post.likes || 0} </button>

<br><br>

<button onclick="toggleComments('${post.id}')"> 💬 Comentários </button> <div id="commentsBox-${post.id}" style="display:none"> <br> <div id="comments-${post.id}"> </div> <input id="comment-${post.id}" placeholder="Comentário"> <button onclick="addComment('${post.id}')"> Enviar </button> </div> </div>

`;

});

}

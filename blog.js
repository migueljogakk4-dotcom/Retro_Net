alert("blog.js carregou!");

let posts = [];

async function loadPosts() {
    const container = document.getElementById("posts");

    const { data, error } = await supa
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        container.innerHTML = `
        <div class="card">
            Erro ao carregar posts.
        </div>`;
        return;
    }

    posts = data;
    renderPosts();
}


function renderPosts() {
    const container = document.getElementById("posts");

    container.innerHTML = "";

    posts.forEach(post => {

        container.innerHTML += `
        <div class="card">

            <h2>${post.title}</h2>

            <p>${post.content}</p>

            <small>
                Autor: ${post.author || "Anônimo"}
            </small>

            <br><br>

            <button onclick="likePost('${post.id}')">
                ❤️ ${post.likes || 0}
            </button>

            <button onclick="toggleComments('${post.id}')">
                💬 Comentários
            </button>


            <div id="comments-${post.id}" style="display:none">

                <br>

                <div id="comment-list-${post.id}">
                Carregando comentários...
                </div>

                <br>

                <input
                id="comment-${post.id}"
                placeholder="Escreva um comentário"
                >

                <button onclick="addComment('${post.id}')">
                    Enviar
                </button>

            </div>

        </div>
        <br>
        `;
    });
}



function toggleComments(postId){

    const box = document.getElementById(
        "comments-" + postId
    );

    if(box.style.display === "none"){
        box.style.display = "block";
        loadComments(postId);
    }
    else{
        box.style.display = "none";
    }

}



async function createPost(){

    const title =
    document.getElementById("postTitle").value;

    const content =
    document.getElementById("postText").value;


    const { error } = await supa
    .from("posts")
    .insert({

        title:title,

        content:content,

        likes:0,

        author:"Usuário"

    });


    if(error){

        alert(error.message);
        return;

    }


    alert("Post criado!");

    loadPosts();

}



async function likePost(id){

    const post =
    posts.find(p => p.id === id);


    await supa
    .from("posts")
    .update({

        likes:(post.likes || 0) + 1

    })
    .eq("id", id);


    loadPosts();

}




async function loadComments(postId){

    const box =
    document.getElementById(
        "comment-list-" + postId
    );


    const {data,error} =
    await supa
    .from("comments")
    .select("*")
    .eq("post_id", postId);


    if(error){

        box.innerHTML =
        "Erro ao carregar comentários.";

        return;

    }


    box.innerHTML="";


    data.forEach(comment=>{

        box.innerHTML += `

        <p>
        💬 ${comment.text}
        <br>
        <small>
        ${comment.author || "Anônimo"}
        </small>
        </p>

        `;

    });

}




async function addComment(postId){

    const input =
    document.getElementById(
        "comment-" + postId
    );


    await supa
    .from("comments")
    .insert({

        post_id:postId,

        text:input.value,

        author:"Usuário"

    });


    input.value="";

    loadComments(postId);

}




async function deletePost(id){

    await supa
    .from("posts")
    .delete()
    .eq("id",id);


    loadPosts();

}



document.addEventListener(
"DOMContentLoaded",
()=>{

    loadPosts();

});

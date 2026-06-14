```javascript
/* ==========================
   MENU UNDERTALE
========================== */

const opcoes =
document.querySelectorAll(".opcao");

const paginas = [
    "home",
    "blog",
    "links",
    "perfil",
    "sobre"
];

let selecionado = 0;

/* ==========================
   CORAÇÃO DO MENU
========================== */

function atualizarMenu(){

    opcoes.forEach(op =>
        op.classList.remove(
            "selecionada"
        )
    );

    opcoes[selecionado]
        .classList.add(
            "selecionada"
        );

    const heart =
        document.getElementById(
            "heart"
        );

    const rect =
        opcoes[selecionado]
        .getBoundingClientRect();

    heart.style.left =
        (rect.left - 30) + "px";

    heart.style.top =
        rect.top + "px";
}

/* ==========================
   ABRIR PÁGINA
========================== */

function abrirPagina(indice){

    document
    .querySelectorAll(".pagina")
    .forEach(p =>
        p.classList.remove(
            "ativa"
        )
    );

    document
    .getElementById(
            paginas[indice]
    )
    .classList.add(
            "ativa"
    );

    localStorage.setItem(
        "paginaAtual",
        indice
    );
}

/* ==========================
   DIÁLOGO UNDERTALE
========================== */

let intervaloDialogo;

function escrever(texto){

    const caixa =
        document.getElementById(
            "dialogo"
        );

    clearInterval(
        intervaloDialogo
    );

    caixa.textContent = "";

    let i = 0;

    intervaloDialogo =
        setInterval(() => {

        if(i >= texto.length){

            clearInterval(
                intervaloDialogo
            );

            return;
        }

        caixa.textContent +=
            texto[i];

        i++;

    }, 30);
}

/* ==========================
   TECLADO
========================== */

document.addEventListener(
"keydown",
(e)=>{

    if(
        e.key ===
        "ArrowRight"
    ){

        selecionado++;

        if(
            selecionado >=
            opcoes.length
        ){
            selecionado = 0;
        }

        atualizarMenu();
    }

    if(
        e.key ===
        "ArrowLeft"
    ){

        selecionado--;

        if(
            selecionado < 0
        ){
            selecionado =
                opcoes.length - 1;
        }

        atualizarMenu();
    }

    if(
        e.key === "Enter"
    ){

        abrirPagina(
            selecionado
        );

        const mensagens = [

"* Você está cheio de DETERMINAÇÃO.",

"* Abrindo o blog...",

"* Abrindo seus links...",

"* Carregando perfil...",

"* Informações do projeto."

        ];

        escrever(
            mensagens[
                selecionado
            ]
        );
    }

});

/* ==========================
   BLOG
========================== */

function publicarPost(){

    const titulo =
        document
        .getElementById(
            "titulo"
        )
        .value
        .trim();

    const texto =
        document
        .getElementById(
            "texto"
        )
        .value
        .trim();

    if(
        !titulo ||
        !texto
    ){
        return;
    }

    const posts =
        JSON.parse(
            localStorage
            .getItem(
                "posts"
            ) || "[]"
        );

    posts.unshift({

        titulo:
            titulo,

        texto:
            texto,

        data:
            new Date()
            .toLocaleString()

    });

    localStorage.setItem(
        "posts",
        JSON.stringify(
            posts
        )
    );

    document
    .getElementById(
        "titulo"
    )
    .value = "";

    document
    .getElementById(
        "texto"
    )
    .value = "";

    carregarPosts();

    escrever(
        "* Post publicado."
    );
}

/* ==========================
   EXCLUIR POST
========================== */

function excluirPost(indice){

    const posts =
        JSON.parse(
            localStorage
            .getItem(
                "posts"
            ) || "[]"
        );

    posts.splice(
        indice,
        1
    );

    localStorage.setItem(
        "posts",
        JSON.stringify(
            posts
        )
    );

    carregarPosts();

    escrever(
        "* Post removido."
    );
}

/* ==========================
   CARREGAR POSTS
========================== */

function carregarPosts(){

    const area =
        document
        .getElementById(
            "posts"
        );

    const posts =
        JSON.parse(
            localStorage
            .getItem(
                "posts"
            ) || "[]"
        );

    area.innerHTML = "";

    posts.forEach(
        (
            post,
            indice
        ) => {

        area.innerHTML += `
<div class="post">

<h3>${post.titulo}</h3>

<small>
${post.data}
</small>

<p>
${post.texto}
</p>

<button
onclick="
excluirPost(
${indice}
)
">
EXCLUIR
</button>

</div>
`;

    });

}

/* ==========================
   INICIALIZAÇÃO
========================== */

window.onload = () => {

    carregarPosts();

    const paginaSalva =
        parseInt(
            localStorage
            .getItem(
                "paginaAtual"
            )
        );

    if(
        !isNaN(
            paginaSalva
        )
    ){

        selecionado =
            paginaSalva;

        abrirPagina(
            paginaSalva
        );
    }

    atualizarMenu();

    escrever(
"* Bem-vindo ao Subsolo."
    );
};
```

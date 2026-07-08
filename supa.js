/*
================================================
RETRO NET
SUPA.JS
Conexão com Supabase
================================================
*/


// ================================
// CONFIGURAÇÃO SUPABASE
// ================================

const supabaseUrl = "https://mecgmhcxwuzcbhbskmdh.supabase.co";

const supabaseKey = "COLE_SUA_ANON_KEY_AQUI";


const supabaseClient = supabase.createClient(
    supabaseUrl,
    supabaseKey
);



// ================================
// USUÁRIO ATUAL
// ================================

async function getUser(){

    const { data } = await supabaseClient.auth.getUser();

    return data.user;

}



// ================================
// CRIAR CONTA
// ================================

async function registerUser(email, password, username){


    const { data, error } = await supabaseClient.auth.signUp({

        email: email,

        password: password

    });



    if(error){

        alert(error.message);

        return;

    }



    await supabaseClient
    .from("profiles")
    .insert({

        id: data.user.id,

        username: username

    });



    alert(
        "Conta criada!"
    );


}



// ================================
// LOGIN
// ================================

async function loginUser(email, password){


    const { data, error } = await supabaseClient.auth.signInWithPassword({

        email: email,

        password: password

    });



    if(error){

        alert(
            "Email ou senha incorretos!"
        );

        return false;

    }



    return true;


}



// ================================
// LOGOUT
// ================================

async function logoutUser(){


    await supabaseClient.auth.signOut();


}



// ================================
// PEGAR PERFIL
// ================================

async function getProfile(){


    const user = await getUser();



    if(!user){

        return null;

    }



    const { data } = await supabaseClient

    .from("profiles")

    .select("*")

    .eq("id", user.id)

    .single();



    return data;


}



// ================================
// CRIAR POST
// ================================

async function createPost(title, content){


    const user = await getUser();


    if(!user){

        alert(
            "Faça login primeiro!"
        );

        return;

    }



    await supabaseClient

    .from("posts")

    .insert({

        title:title,

        content:content,

        author:user.id

    });


}



// ================================
// PEGAR POSTS
// ================================

async function loadPosts(){


    const { data, error } = await supabaseClient

    .from("posts")

    .select("*")

    .order(

        "created_at",

        {

            ascending:false

        }

    );



    if(error){

        console.log(error);

        return [];

    }



    return data;


}



// ================================
// CRIAR COMENTÁRIO
// ================================

async function createComment(postId,text){


    const user = await getUser();



    if(!user){

        alert(
            "Faça login!"
        );

        return;

    }



    await supabaseClient

    .from("comments")

    .insert({

        post_id:postId,

        author:user.id,

        text:text

    });


}



// ================================
// PEGAR COMENTÁRIOS
// ================================

async function loadComments(postId){


    const { data } = await supabaseClient

    .from("comments")

    .select("*")

    .eq(

        "post_id",

        postId

    )

    .order(

        "created_at",

        {

            ascending:true

        }

    );



    return data;


}


console.log(
    "SUPA.JS conectado!"
);

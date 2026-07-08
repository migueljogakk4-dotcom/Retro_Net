/* =========================================================
   RETRO NET
   APP.JS - PARTE 1
   FIREBASE + LOGIN
========================================================= */

/* =============================
   FIREBASE
============================= */

const firebaseConfig = {
  apiKey: "AIzaSyCnY_1oPU6KIRlghoMcMQWgh3numf_Z0w0",
  authDomain: "retro-net-m.firebaseapp.com",
  projectId: "retro-net-m",
  storageBucket: "retro-net-m.firebasestorage.app",
  messagingSenderId: "403334878412",
  appId: "1:403334878412:web:6cd40eb7a016708355de69"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

/* =============================
   APP
============================= */

const App = {

    user: null,

    init() {

        console.log("RETRO NET iniciada.");

        this.listenAuth();

        this.clock();

    },

    clock() {

        setInterval(() => {

            const now = new Date();

            document.title =
                "RETRO NET • " +
                now.toLocaleTimeString();

        },1000);

    },

    listenAuth() {

        auth.onAuthStateChanged(async user=>{

            if(!user){

                this.user=null;

                return;

            }

            this.user=user;

            console.log("Logado:",user.email);

        });

    }

};

/* =============================
   LOGIN
============================= */

async function login(){

    const email=document.getElementById("email");
    const password=document.getElementById("password");

    if(!email||!password)return;

    try{

        await auth.signInWithEmailAndPassword(

            email.value,

            password.value

        );

        alert("Login realizado!");

        location.href="index.html";

    }

    catch(error){

        alert(error.message);

    }

}

/* =============================
   CADASTRO
============================= */

async function register(){

    const username=document.getElementById("username");
    const email=document.getElementById("email");
    const password=document.getElementById("password");

    if(!username||!email||!password)return;

    try{

        const credential=

        await auth.createUserWithEmailAndPassword(

            email.value,

            password.value

        );

        await db.collection("users")

        .doc(credential.user.uid)

        .set({

            username:username.value,

            email:email.value,

            bio:"",

            avatar:"",

            createdAt:firebase.firestore.FieldValue.serverTimestamp()

        });

        alert("Conta criada!");

        location.href="index.html";

    }

    catch(error){

        alert(error.message);

    }

}

/* =============================
   LOGOUT
============================= */

async function logout(){

    await auth.signOut();

    location.href="login.html";

}

/* =============================
   PERFIL
============================= */

async function getProfile(){

    if(!auth.currentUser)return null;

    const doc=

    await db.collection("users")

    .doc(auth.currentUser.uid)

    .get();

    return doc.data();

}

/* =============================
   BOTÕES
============================= */

document.addEventListener("DOMContentLoaded",()=>{

    App.init();

    const loginButton=document.getElementById("loginButton");

    if(loginButton){

        loginButton.onclick=login;

    }

    const registerButton=document.getElementById("registerButton");

    if(registerButton){

        registerButton.onclick=register;

    }

    const logoutButton=document.getElementById("logoutButton");

    if(logoutButton){

        logoutButton.onclick=logout;

    }

});

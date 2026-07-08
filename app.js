/*
==========================================
RETRO NET
app.js
==========================================
*/

const App = {

    version: "1.0",

    init() {

        console.log("RETRO NET iniciada.");

        this.clock();

        this.menuEffects();

        this.welcome();

    },

    welcome() {

        console.log("Bem-vindo!");

    },

    menuEffects() {

        const buttons = document.querySelectorAll("nav a");

        buttons.forEach(button => {

            button.addEventListener("mouseenter", () => {

                button.style.transform = "translateY(-2px)";

            });

            button.addEventListener("mouseleave", () => {

                button.style.transform = "";

            });

        });

    },

    clock() {

        setInterval(() => {

            const now = new Date();

            const hour =
                String(now.getHours()).padStart(2,"0");

            const minute =
                String(now.getMinutes()).padStart(2,"0");

            const second =
                String(now.getSeconds()).padStart(2,"0");

            document.title =
                `RETRO NET • ${hour}:${minute}:${second}`;

        },1000);

    }

};

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});

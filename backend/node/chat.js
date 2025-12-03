// chat.js
import fetch from "node-fetch";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("💬 Chat con el agente IA (escribe 'salir' para terminar)");

function preguntar() {
    rl.question("Tú: ", async (mensaje) => {
        if (mensaje.toLowerCase() === "salir") {
            console.log("👋 Hasta luego!");
            rl.close();
            return;
        }

        try {
            const res = await fetch("http://localhost:8000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: mensaje })
            });

            const data = await res.json();
            console.log("Agente:", data.respuesta);

        } catch (e) {
            console.log(" Error comunicándose con el servidor:", e.message);
        }

        preguntar(); 
    });
}

preguntar();

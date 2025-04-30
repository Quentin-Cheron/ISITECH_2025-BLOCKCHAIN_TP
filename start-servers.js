const { spawn } = require("child_process");
const path = require("path");

// Fonction pour lancer un serveur avec un fichier .env spécifique
function startServer(envFile) {
  const server = spawn("node", ["app/server.js"], {
    env: {
      ...process.env,
      NODE_ENV: "development",
      ...require("dotenv").config({ path: envFile }).parsed,
    },
    stdio: "inherit",
  });

  server.on("error", (err) => {
    console.error(`Erreur lors du lancement du serveur avec ${envFile}:`, err);
  });

  return server;
}

// Lancer les deux serveurs
console.log("Lancement des serveurs P2P...");

const server1 = startServer(".env");
const server2 = startServer(".env.6003");

// Gérer la fermeture propre des serveurs
process.on("SIGINT", () => {
  console.log("\nArrêt des serveurs...");
  server1.kill();
  server2.kill();
  process.exit();
});

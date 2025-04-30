import express from "express";
import Blockchain from "./blockchain.js";
import blockRouter from "./routes/block.route.js";
import P2PServer from "./app/p2p.server.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const blockchain = new Blockchain();

const p2pServer = new P2PServer(blockchain);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/", blockRouter);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Serveur API Blockchain démarré sur le port ${PORT}`);
});

p2pServer.listen();
p2pServer.syncChain();

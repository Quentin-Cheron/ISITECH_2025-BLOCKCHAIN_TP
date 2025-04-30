import { WebSocketServer, WebSocket } from "ws";

class P2PServer {
  constructor(blockchain) {
    this.blockchain = blockchain;
    this.sockets = [];
    this.server = null;
  }

  listen() {
    const port = process.env.P2P_PORT || 6001;
    this.server = new WebSocketServer({ port });
    this.server.on("connection", (socket) => this.connectSocket(socket));
    console.log(`Serveur P2P en écoute sur le port ${port}`);

    this.connectToPeers();
  }

  connectSocket(socket) {
    this.sockets.push(socket);
    this.messageHandler(socket);
    console.log("Nouvelle connexion WebSocket établie");
  }

  messageHandler(socket) {
    socket.on("message", (message) => {
      try {
        const data = JSON.parse(message);
        console.log("Message reçu:", data);
        if (data.type === "BLOCKCHAIN") {
          this.blockchain.replaceChain(data.chain);
        }
      } catch (e) {
        console.error("Erreur lors du traitement du message:", e);
      }
    });

    socket.on("error", (error) => {
      console.error("Erreur WebSocket:", error);
    });

    socket.on("close", () => {
      console.log("Connexion WebSocket fermée");
      this.sockets = this.sockets.filter((s) => s !== socket);
    });
  }

  sendChain(socket) {
    socket.send(
      JSON.stringify({
        type: "BLOCKCHAIN",
        chain: this.blockchain.chain,
      })
    );
  }

  syncChain() {
    this.sockets.forEach((socket) => this.sendChain(socket));
  }

  connectToPeers() {
    const peers = process.env.PEERS ? process.env.PEERS.split(",") : [];
    const currentPeer = `ws://localhost:${process.env.P2P_PORT}`;
    console.log("Tentative de connexion aux pairs:", peers);

    peers
      .filter((peer) => peer !== currentPeer)
      .forEach((peer) => {
        try {
          const socket = new WebSocket(peer);
          socket.on("open", () => {
            console.log(`Connexion établie avec ${peer}`);
            this.connectSocket(socket);
            this.sendChain(socket);
          });

          socket.on("error", (error) => {
            console.error(`Erreur de connexion avec ${peer}:`, error.message);
          });

          socket.on("close", () => {
            console.log(`Connexion fermée avec ${peer}`);
            this.sockets = this.sockets.filter((s) => s !== socket);
          });
        } catch (error) {
          console.error(
            `Erreur lors de la création de la connexion avec ${peer}:`,
            error.message
          );
        }
      });
  }
}

export default P2PServer;

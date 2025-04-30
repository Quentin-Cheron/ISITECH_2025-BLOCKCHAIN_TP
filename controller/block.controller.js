import Blockchain from "../blockchain.js";

export const getBlocks = (blockchain) => (req, res) => {
  res.json(blockchain.chain);
};

export const mineBlock = (blockchain) => (req, res) => {
  const data = req.body?.data;

  if (!data) {
    return res.status(400).json({ error: "Données manquantes pour le bloc." });
  }

  blockchain.addBlock(data);

  res.status(201).json({
    message: "Bloc ajouté !",
    block: blockchain.chain[blockchain.chain.length - 1],
  });
};

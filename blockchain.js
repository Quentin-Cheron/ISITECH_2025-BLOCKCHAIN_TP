import Block from "./block.js";

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data) {
    const block = Block.mineBlock(this.chain[this.chain.length - 1], data);
    this.chain.push(block);
  }

  blockHash(block) {
    const { timestamp, lastHash, data, nonce, difficulty } = block;
    return Block.hash(timestamp, lastHash, data, nonce, difficulty);
  }

  isValidChain(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const block = chain[i];
      const lastBlock = chain[i - 1];

      if (
        block.lastHash !== lastBlock.hash ||
        block.hash !== this.blockHash(block)
      ) {
        return false;
      }
    }

    return true;
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      console.log(
        "La chaîne reçue n'est pas plus longue et ne sera pas remplacée"
      );
      return;
    } else if (!this.isValidChain(chain)) {
      console.log("La chaîne reçue n'est pas valide");
      return;
    }

    console.log("Remplacement de la blockchain par la nouvelle chaîne");
    this.chain = chain;
  }
}

export default Blockchain;

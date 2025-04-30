import SHA256 from "crypto-js/sha256.js";
import { DIFFICULTY, MINE_RATE } from "./config.js";

class Block {
  constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
  }

  toString() {
    return `Block -\n Timestamp: ${
      this.timestamp
    }\n Last Hash: ${this.lastHash.substring(
      0,
      10
    )}\n Hash: ${this.hash.substring(0, 10)}\n Data: ${this.data}\n Nonce: ${
      this.nonce
    }\n Difficulty: ${this.difficulty}`;
  }

  static genesis() {
    return new this("Genesis time", "-----", "f1r57-h45h", [], 0, DIFFICULTY);
  }

  static mineBlock(lastBlock, data) {
    const lastHash = lastBlock.hash;
    let { difficulty } = lastBlock;
    let nonce = 0;
    let hash, timestamp;
    do {
      nonce++;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty(lastBlock, timestamp);
      hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));
    return new this(timestamp, lastHash, hash, data, nonce, difficulty);
  }

  static hash(timestamp, lastHash, data, nonce, difficulty) {
    return SHA256(
      `${timestamp} ${lastHash} ${data} ${nonce} ${difficulty}`
    ).toString();
  }

  static adjustDifficulty(lastBlock, currentTime) {
    let { difficulty } = lastBlock;
    if (lastBlock.timestamp + MINE_RATE > currentTime) {
      return difficulty + 1;
    } else {
      return difficulty - 1;
    }
  }
}

export default Block;

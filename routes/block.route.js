import express from "express";
import { getBlocks, mineBlock } from "../controller/block.controller.js";
import Blockchain from "../blockchain.js";

const router = express.Router();
const blockchain = new Blockchain();

router.get("/blocks", getBlocks(blockchain));
router.post("/mine", mineBlock(blockchain));

export default router;

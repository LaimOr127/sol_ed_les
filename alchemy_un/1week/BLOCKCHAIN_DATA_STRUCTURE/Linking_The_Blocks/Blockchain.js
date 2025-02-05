const Block = require('./Block');

class Blockchain {
    constructor() {
        const genesisBlock = new Block("Gen Block");
        this.chain = [genesisBlock];
    }

    addBlock(block) {
        const previousBlock = this.chain[this.chain.length - 1]; //предыдущий блок
        block.previousHash = previousBlock.toHash(); //previousHash
        this.chain.push(block); //блок в цепочку
    }
}

module.exports = Blockchain;

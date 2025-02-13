const Block = require('./Block');

class Blockchain {
    constructor() {
        const genesisBlock = new Block("Gen Block");
        this.chain = [genesisBlock];
    }

    addBlock(block) {
        const previousBlock = this.chain[this.chain.length - 1]; //получаем предыдущий блок
        block.previousHash = previousBlock.toHash(); //устанавливаем previousHash
        this.chain.push(block);
    }

    isValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];//получаем текущий блок
            const previousBlock = this.chain[i - 1];

            if (currentBlock.previousHash !== previousBlock.toHash()) {//проверяем, что previousHash равен хэшу предыдущего блока
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;

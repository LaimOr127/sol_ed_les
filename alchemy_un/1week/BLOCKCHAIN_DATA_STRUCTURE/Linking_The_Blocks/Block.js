const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data, previousHash = '') {
        this.data = data;
        this.previousHash = previousHash; //добавляем previousHash
    }

    toHash() {
        return SHA256(this.data + this.previousHash).toString(); //previousHash
    }
}

module.exports = Block;

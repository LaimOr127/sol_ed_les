const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(data) {
        this.data = data;
    }

    toHash() {//создаем хэш
        return SHA256(this.data).toString();//хэшируем данные
    }
}

module.exports = Block;
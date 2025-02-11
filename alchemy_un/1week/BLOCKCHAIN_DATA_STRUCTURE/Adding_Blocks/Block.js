const SHA256 = require('crypto-js/sha256');//подключаем библиотеку для хэширования

class Block {
    constructor(data) {
        this.data = data;
    }

    toHash() {//создаем хэш
        return SHA256(this.data).toString();
    }
}

module.exports = Block;
const Block = require('./Block');

class Blockchain {
    constructor() {//создаем блокчейн
        this.chain = [new Block("Gen Block")]; //создание и добавление блока
    }

    addBlock(block) {
        this.chain.push(block); //новый блок
    }
}

module.exports = Blockchain;

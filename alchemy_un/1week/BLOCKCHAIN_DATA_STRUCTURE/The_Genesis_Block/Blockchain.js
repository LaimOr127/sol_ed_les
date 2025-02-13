const Block = require('./Block');

class Blockchain {
    constructor() {
        this.chain = [ new Block("Gen Block") ]; //создание и добавление блока
    }
}

module.exports = Blockchain;
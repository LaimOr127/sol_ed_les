const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.push(transaction);
}

function mine() {
    const transactions = mempool.splice(0, MAX_TRANSACTIONS);//(Max_Tra... --> mempool)
    let nonce = 0;
    let hash;
    let block;

    do {//хеш должен стать < сложности
        block = {
            id: blocks.length,// id блока
            transactions,
            nonce
        };

        hash = SHA256(JSON.stringify(block)).toString();
        nonce++;
    } while (BigInt(`0x${hash}`) >= TARGET_DIFFICULTY);

    block.hash = hash;//обновили хеш

    blocks.push(block);// push используется в динамическим
}

module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool
};

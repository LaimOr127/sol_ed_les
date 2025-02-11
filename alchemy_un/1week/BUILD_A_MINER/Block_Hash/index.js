const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {//(transaction --> mempool)
    mempool.push(transaction);
}

function mine() {//(mempool --> blocks)
    const transactions = mempool.splice(0, MAX_TRANSACTIONS);//(Max_Tra... --> mempool)
    let nonce = 0;
    let hash;
    let block;

    do {//хеш должен стать < сложности
        block = {
            id: blocks.length,
            transactions,
            nonce
        };

        hash = SHA256(JSON.stringify(block)).toString();//хешируем блок
        nonce++;//увеличиваем число
    } while (BigInt(`0x${hash}`) >= TARGET_DIFFICULTY);//пока хеш больше сложности

    block.hash = hash;//обновили хеш

    blocks.push(block);// push используется в динамическим
}

module.exports = {//экспортируем
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction,
    mine,
    blocks,
    mempool
};

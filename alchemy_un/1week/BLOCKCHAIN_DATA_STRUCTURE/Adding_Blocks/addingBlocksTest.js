const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');

let blockchain;//создаем блокчейн

describe('Blockchain', function() {
    before(() => {
        blockchain = new Blockchain();
    });

    it('should have an addBlock function', function() {//проверяем, что функция добавления блока существует
        assert.equal(typeof blockchain.addBlock, 'function');
    });

    describe('adding new blocks', function() {
        let block1;//создаем блоки
        let block2;
        before(() => {
            block1 = new Block("Some data");//создаем блоки
            block2 = new Block("Some other data");
            blockchain.addBlock(block1);
            blockchain.addBlock(block2);
        });

        it('should be a chain of three blocks', function() {//проверяем, что блокчейн состоит из 3 блоков
            assert.equal(blockchain.chain.length, 3);
        });

        it('should include block1 and block2', function () {//проверяем, что блокчейн состоит из 3 блоков
            assert(blockchain.chain.some((x) => x === block1), "Could not find block1. Remember to push the block argument in addBlock!")//проверяем, что блокчейн состоит из 3 блоков
            assert(blockchain.chain.some((x) => x === block2), "Could not find block1. Remember to push the block argument in addBlock!")
        });
    });
});
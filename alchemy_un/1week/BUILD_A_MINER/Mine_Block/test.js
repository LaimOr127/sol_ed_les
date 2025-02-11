const { assert } = require('chai');
const { mine, blocks } = require('../index');
const SHA256 = require('crypto-js/sha256');//хешируем блок

describe('mine', () => {
    describe('first block', () => {//проверяем, что блок добавлен
        let hash;
        before(() => {
            hash = mine();
        });
        it('should add to the blocks', () => {//проверяем, что блок добавлен
            assert.equal(blocks.length, 1);
        });
        it('should store the expected id', () => {
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.id != null, "did not find an id property on the block");
            assert.equal(lastBlock.id, 0);
        });
    });
    describe('second block', () => {
        let hash;
        before(() => {
            hash = mine();
        });
        it('should add to the blocks', () => {//проверяем, что блок добавлен
            assert.equal(blocks.length, 2);
        });
        it('should store the expected id', () => {
            const lastBlock = blocks[blocks.length - 1];// константа для последнего блока
            assert(lastBlock.id != null, "did not find an id property on the block");
            assert.equal(lastBlock.id, 1);
        });
    });
});
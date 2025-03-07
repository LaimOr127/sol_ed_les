const { assert } = require('chai');
const { mine, blocks } = require('../index');
const SHA256 = require('crypto-js/sha256');

describe('mine', () => {
    describe('first block', () => {
        let hash;
        before(() => {
            hash = mine();
        });
        it('should add to the blocks', () => {//проверяем, что блок добавлен
            assert.equal(blocks.length, 1);
        });
        it('should return the expected hash', () => {//проверяем, что хэш соответствует ожидаемому
            const expectedHash = SHA256(JSON.stringify({ id: 0 }));//хэшируем блок
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.hash, "did not find a hash property on the block");
            assert.equal(lastBlock.hash.toString(), expectedHash.toString());
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
        it('should return the expected hash', () => {//проверяем, что хэш соответствует ожидаемому
            const expectedHash = SHA256(JSON.stringify({ id: 1 }));
            const lastBlock = blocks[blocks.length - 1];
            assert(lastBlock.hash, "did not find a hash property on the block");//проверяем, что хэш существует
            assert.equal(lastBlock.hash.toString(), expectedHash.toString());
        });
    });
});
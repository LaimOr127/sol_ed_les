const { assert } = require('chai');
const { mine, blocks, mempool, addTransaction, TARGET_DIFFICULTY } = require('../index');
const SHA256 = require('crypto-js/sha256');

describe('mine', () => {
    describe('with 5 mempool transactions', () => {
        before(() => {
            for (let i = 0; i < 5; i++) {
                addTransaction({ sender: 'bob', to: 'alice' });//(5 --> mempool)
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();
            });
            it('should add to the blocks', () => {//проверяем, что блок добавлен
                assert.equal(blocks.length, 1);
            });
            it('should store the transactions on the block', () => {//проверяем, что транзакции сохранены в блоке
                assert.equal(blocks[blocks.length - 1].transactions.length, 5);
            });
            it('should clear the mempool', () => {//проверяем, что mempool очищен
                assert.equal(mempool.length, 0);
            });
            it('should have a nonce', () => {//проверяем, что есть nonce
                assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");
            });
            it('should have a hash lower than the target difficulty', () => {//проверяем, что хэш меньше целевой сложности
                const actual = blocks[blocks.length - 1].hash.toString();
                const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                assert(isLess, "expected the hash to be less than the target difficulty");//проверяем, что хэш меньше целевой сложности
            });
        });
    });
    describe('with 15 mempool transactions', () => {
        before(() => {
            for (let i = 0; i < 15; i++) {//(15 --> mempool)
                addTransaction({ sender: 'bob', to: 'alice' });
            }
        });
        describe('after mining', () => {
            before(() => {
                mine();//(mempool --> blocks)
            });
            it('should add to the blocks', () => {//проверяем, что блок добавлен
                assert.equal(blocks.length, 2);
            });
            it('should store the transactions on the block', () => {//проверяем, что транзакции сохранены в блоке
                assert.equal(blocks[blocks.length - 1].transactions.length, 10);
            });
            it('should reduce the mempool to 5', () => {//проверяем, что mempool очищен
                assert.equal(mempool.length, 5);
            });
            it('should have a nonce', () => {
                assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");//проверяем, что есть nonce
            });
            it('should have a hash lower than the target difficulty', () => {
                const actual = blocks[blocks.length - 1].hash.toString();
                const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                assert(isLess, "expected the hash to be less than the target difficulty");
            });
            describe('after mining again', () => {
                before(() => {
                    mine();
                });
                it('should add to the blocks', () => {//проверяем, что блок добавлен
                    assert.equal(blocks.length, 3);
                });
                it('should store the transactions on the block', () => {
                    assert.equal(blocks[blocks.length - 1].transactions.length, 5);
                });
                it('should clear the mempool', () => {//проверяем, что mempool очищен
                    assert.equal(mempool.length, 0);
                });
                it('should have a nonce', () => {
                    assert.isDefined(blocks[blocks.length - 1].nonce, "did not find a nonce on the block");//проверяем, что есть nonce
                });
                it('should have a hash lower than the target difficulty', () => {
                    const actual = blocks[blocks.length - 1].hash.toString();//проверяем, что хэш меньше целевой сложности
                    const isLess = BigInt(`0x${actual}`) < TARGET_DIFFICULTY;
                    assert(isLess, "expected the hash to be less than the target difficulty");
                });
            });
        });
    });
});
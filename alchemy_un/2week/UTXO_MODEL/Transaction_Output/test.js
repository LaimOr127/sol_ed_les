const { assert } = require('chai');
const TXO = require('../TXO');

describe('TXO', function () {
    const address = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const amount = 10;
    const txo = new TXO(address, amount);

    describe('constructor', () => {
        it('should set the owner', () => {//проверяем, что владелец равен адресу
            assert.equal(txo.owner, address);
        });
        it('should set the amount', () => {//проверяем, что сумма равна 10
            assert.equal(txo.amount, amount);
        });
        it('should set spent to false', () => {//проверяем, что txo не потраен
            assert.equal(txo.spent, false);//проверяем, что txo не потраен
        });
    });

    describe('spend', () => {
        it('should set spent to true', () => {//проверяем, что txo потраен
            txo.spend();
            assert.equal(txo.spent, true);
        });
    });
});
const { assert } = require('chai');
const Transaction = require('../Transaction');
const TXO = require('../TXO');

describe('Transaction', function () {
    const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";
    const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";

    const txo1 = new TXO(fromAddress, 5);
    const txo2 = new TXO(fromAddress, 5);
    const txo3 = new TXO(fromAddress, 3);
    const txo4 = new TXO(fromAddress, 4);
    const outputTXO1 = new TXO(toAddress, 7);//создаем выходящий TXO
    const outputTXO2 = new TXO(fromAddress, 3); 

    it('should mark both inputs as spent', () => {//проверяем, что оба входящих TXO потрачены
        const tx = new Transaction([txo1, txo2], [outputTXO1, outputTXO2]);
        tx.execute();
        assert(txo1.spent);//проверяем, что первый TXO потрачен
        assert(txo2.spent);
    });

    it('should leave both inputs unspent if funds unavailable', () => {//проверяем, что оба входящих TXO не потрачены, если недостаточно средств
        const tx = new Transaction([txo3, txo4], [outputTXO1, outputTXO2]);
        let ex;//создаем переменную для хранения ошибки
        try {
            tx.execute();
        }
        catch (_ex) {
            ex = _ex;//если ошибка, то сохраняем ее в переменную
        }
        assert(ex, "Expected an exception to be thrown!");
        assert(!txo3.spent, "The transaction should be marked as unspent");//проверяем, что первый TXO не потрачен
        assert(!txo4.spent, "The transaction should be marked as unspent");
    });

    it('should leave valid inputs unspent if a double spend occurs', () => {//проверяем, что оба входящих TXO не потрачены, если недостаточно средств
        const tx = new Transaction([txo1, txo4], [outputTXO1, outputTXO2]);
        let ex;
        try {
            tx.execute();
        }
        catch (_ex) {
            ex = _ex;
        }
        assert(ex, "Expected an exception to be thrown!");
        assert(!txo4.spent, "The transaction should be marked as unspent");//проверяем, что второй TXO не потрачен
    });

});
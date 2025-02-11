const { assert } = require('chai');
const Transaction = require('../Transaction');
const TXO = require('../TXO');

describe('Transaction', function () {
    const fromAddress = "1DBS97W3jWw6FnAqdduK1NW6kFo3Aid1N6";//адрес отправителя
    const toAddress = "12ruWjb4naCME5QhjrQSJuS5disgME22fe";//адрес получателя

    describe('with unspent input TXOs', () => {
        const inputTXO1 = new TXO(fromAddress, 5);//создаем входящий TXO
        const inputTXO2 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 10);
        const tx = new Transaction([inputTXO1, inputTXO2], [outputTXO1]);

        it('should execute without error', () => {//проверяем, что транзакция выполнена без ошибок
            try {
                tx.execute();//выполняем транзакцию
            }
            catch(ex) {
                assert.fail(ex.message);//если ошибка, то выводим ее
                console.log(ex);//выводим ошибку
            }
        });
    });

    describe('with a spent input TXO', () => {
        const txo1 = new TXO(fromAddress, 5);
        const txo2 = new TXO(fromAddress, 5);
        const txo3 = new TXO(fromAddress, 5);
        const outputTXO1 = new TXO(toAddress, 15);

        txo2.spend();

        const tx = new Transaction([txo1, txo2, txo3], [outputTXO1]);

        it('should throw an error on execute', () => {//проверяем, что транзакция выполнена без ошибок
            let ex;
            try {
                tx.execute();
            }
            catch (_ex) {//если ошибка, то выводим ее
                ex = _ex;
            }
            assert(ex, "Did not throw an exception with a spent input TXO!");
        });
    });
});
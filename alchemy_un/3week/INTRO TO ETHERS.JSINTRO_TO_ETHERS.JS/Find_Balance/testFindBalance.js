const { assert } = require('chai');
const findMyBalance = require('../findMyBalance')
const { PRIVATE_KEY, INITIAL_BALANCE } = require('../config');

describe('findMyBalance', () => {
    it('should return an instance of Promise', () => {//тест на то, что функция возвращает экземпляр Promise
        assert(findMyBalance(PRIVATE_KEY) instanceof Promise);
    });
    it('should resolve with the initial balance', async () => {//тест на то, что функция возвращает начальный баланс
        const balance = await findMyBalance(PRIVATE_KEY);
        assert(INITIAL_BALANCE.eq(balance));
    });
});
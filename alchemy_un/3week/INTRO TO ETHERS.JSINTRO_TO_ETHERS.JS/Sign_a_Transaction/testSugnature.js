const { assert } = require('chai');
const signaturePromise = require('../sign');
const { utils } = require('ethers');

describe('signaturePromise', () => {
    it('should be an instance of Promise', () => {
        assert(signaturePromise instanceof Promise);
    });

    it('should resolve with a hexadecimal representation of the transaction', async () => {
        const hex = await signaturePromise;
        const matches = /^0x[0-9A-Fa-f]*$/.test(hex);
        if(!matches) console.log(hex);
        assert(matches, 'did not match the expect hash output');
    });

    describe('parsed properties', () => {
        let parsed;
        before(async () => {
            const hex = await signaturePromise;
            parsed = utils.parseTransaction(hex);
        });

        it('should contain the to address', () => {//тест на наличие адреса назначения
            assert.equal(parsed.to, "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92");
        });

        it('should contain the value', () => {//тест на наличие значения
            assert.equal(parsed.value.toString(), "1000000000000000000");
        });

        it('should have the appropriate gas limit for transfers', () => {//тест на наличие лимита газа
            assert(parsed.gasLimit.eq(21000), "The gas limit should be 21000");
        });

        it('should derive the from address', () => {//тест на наличие адреса отправителя
            assert.equal(parsed.from, "0x5409ED021D9299bf6814279A6A1411A7e866A631");
        });
    });
});
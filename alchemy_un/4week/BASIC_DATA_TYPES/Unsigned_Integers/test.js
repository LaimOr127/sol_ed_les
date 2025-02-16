const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should create variable a which is less than 256', async () => {//тест на то, что переменная a меньше 256
        const a = await contract.callStatic.a();
        assert.isAtMost(a, 255);
    });

    it('should create variable b which is greater than or equal to 256', async () => {//тест на то, что переменная b больше или равна 256
        const b = await contract.callStatic.b();
        assert.isAtLeast(b, 256);
    });

    it('should create variable sum which equals a and b together', async () => {//тест на то, что переменная sum равна a + b
        const a = await contract.callStatic.a();
        const b = await contract.callStatic.b();
        const sum = await contract.callStatic.sum();
        assert.equal(sum.toNumber(), a + b);
    });
});
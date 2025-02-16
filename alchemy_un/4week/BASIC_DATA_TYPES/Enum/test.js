const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should create four foods', async () => {//тест на то, что переменные food1, food2, food3, food4 равны 0
        for(let i = 1; i <= 4; i++) {
            const food = await contract.callStatic[`food${i}`]();
            assert.isAtLeast(food, 0);
        }
    });
});
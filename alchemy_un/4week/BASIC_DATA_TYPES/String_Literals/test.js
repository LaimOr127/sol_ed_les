const { assert } = require('chai');
describe('Contract', function () {
    let contract;
    before(async () => {
        const Contract = await ethers.getContractFactory("Contract");
        contract = await Contract.deploy();
        await contract.deployed();
    });

    it('should create a msg1 as bytes32 with hello world', async () => {//тест на то, что переменная msg1 равна hello world
        const msg1 = await contract.callStatic.msg1();
        const ascii = ethers.utils.parseBytes32String(msg1);
        assert(/hello world/i.test(ascii), "Could not find 'Hello World' in your msg1!");
    });

    it('should create a msg2 as string which requires more than 32 bytes', async () => {//тест на то, что переменная msg2 равна строке, которая требует больше 32 байт
        const msg2 = await contract.callStatic.msg2();
        assert.isAtLeast(Buffer.byteLength(msg2, 'utf8'), 32);
    });
});
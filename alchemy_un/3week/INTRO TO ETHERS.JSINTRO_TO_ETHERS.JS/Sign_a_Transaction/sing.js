const ethers = require('ethers');
const { Wallet, utils } = ethers;
const { wallet1 } = require('./wallets');

//создаём подписанную транзакцию
const signaturePromise = wallet1.signTransaction({
    value: utils.parseEther("1"), // 1 ETH в Wei
    to: "0xdD0DC6FB59E100ee4fA9900c2088053bBe14DE92",
    gasLimit: 21000, //лимит газа для простой транзакции
});

module.exports = signaturePromise;

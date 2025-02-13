const { Wallet, utils, providers } = require('ethers');
const { ganacheProvider, PRIVATE_KEY } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);//создаём Web3Provider для Ganache

const wallet = new Wallet(PRIVATE_KEY, provider);//подключаем кошелёк к провайдеру

async function sendEther({ value, to }) {
    const rawTx = await wallet.signTransaction({
        value,
        to,
        gasLimit: 0x5208,  //21000 газа
        gasPrice: 0x3b9aca00 //1 пwei
    });

    return provider.sendTransaction(rawTx);//отправляем транзакцию и возвращаем промис
}

module.exports = sendEther;

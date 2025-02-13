const { utils, providers, Wallet } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Donate at least 1 ether from the wallet to each charity
 * @param   {string} privateKey - a hex string private key for a wallet with 10 ETH
 * @param   {array} charities - an array of Ethereum charity addresses 
 *
 * @returns {Promise} a promise that resolves after all donations have been sent
 */
async function donate(privateKey, charities) {
    const wallet = new Wallet(privateKey, provider);//подключаем кошелек к провайдеру

    const txPromises = charities.map(async (charity, index) => {
        return wallet.sendTransaction({
            to: charity,
            value: utils.parseEther("1.0"),//отправляем 1 ETH
            gasLimit: 21000,//устанавливаем газ
            nonce: await provider.getTransactionCount(wallet.address) + index//корректируем nonce
        });
    });

    return Promise.all(txPromises);//ждём выполнения всех транзакций
}

module.exports = donate;

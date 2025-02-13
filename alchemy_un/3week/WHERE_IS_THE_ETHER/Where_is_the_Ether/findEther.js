const { providers } = require('ethers');
const { ganacheProvider } = require('./config');

const provider = new providers.Web3Provider(ganacheProvider);

/**
 * Given an ethereum address find all the addresses
 * that were sent ether from that address
 * @param {string} address - The hexadecimal address for the sender
 * @async
 * @returns {Array} all the addresses that received ether
 */
async function findEther(address) {
    const latestBlock = await provider.getBlockNumber(); //получаем номер последнего блока
    const recipients = new Set();

    for (let i = 0; i <= latestBlock; i++) {
        const block = await provider.getBlockWithTransactions(i); //получаем блок с транзакциями
        for (const tx of block.transactions) {
            if (tx.from.toLowerCase() === address.toLowerCase()) {
                recipients.add(tx.to); //добавляем адрес получателя
            }
        }
    }

    return Array.from(recipients); //возвращаем массив уникальных адресов
}

module.exports = findEther;

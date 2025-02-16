/**
 * Set the message on the contract using the signer passed in
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {ethers.types.Signer} signer - ethers.js signer instance
 * @return {promise} a promise of transaction modifying the `message`
 */
async function setMessage(contract, signer) {
    return await contract.connect(signer).modify("Hello, world!");// Подключаем контракт и вызываем функцию modify для изменения сообщения
}

module.exports = setMessage;

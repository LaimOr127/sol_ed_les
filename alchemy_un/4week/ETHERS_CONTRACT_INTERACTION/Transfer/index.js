/**
 * Transfer funds on the contract from the current signer 
 * to the friend's address
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @param {string} friend - a string containing a hexadecimal ethereum address
 * @return {promise} a promise of the transfer transaction
 */
async function transfer(contract, friend) {
    return await contract.transfer(friend, 100);//переводим от владельца контракта на адрес друга
}

module.exports = transfer;

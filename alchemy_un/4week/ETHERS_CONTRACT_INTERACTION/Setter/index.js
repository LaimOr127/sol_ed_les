/**
 * Modify the `value` stored in the contract
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise of transaction
 */
async function setValue(contract) {
    return await contract.modify(42); //Пример значения изменениея
}

module.exports = setValue;

/**
 * Find the `value` stored in the contract
 *
 * @param {ethers.Contract} contract - ethers.js contract instance
 * @return {promise} a promise which resolves with the `value`
 */
async function getValue(contract) {
    const value = await contract.value(); //используем геттер для получения значения
    return value;
}

module.exports = getValue;

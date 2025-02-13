const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const slicedKey = publicKey.slice(1); // убираем первый байт
    const hash = keccak256(slicedKey); // хешируем оставшиеся байты
    return hash.slice(-20); // последние 20 байт
}

module.exports = getAddress;

const secp = require("ethereum-cryptography/secp256k1");
const hashMessage = require("./hashMessage");

async function recoverKey(message, signature, recoveryBit) {
    const messageHash = hashMessage(message); //хешируем сообщение
    return secp.recoverPublicKey(messageHash, signature, recoveryBit);
}

module.exports = recoverKey;

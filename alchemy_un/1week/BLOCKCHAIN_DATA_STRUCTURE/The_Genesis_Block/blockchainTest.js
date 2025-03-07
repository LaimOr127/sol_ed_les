const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');

describe('Blockchain', function() {
    it('should have a genesis block', function() {//проверяем, что блокчейн существует
        const blockchain = new Blockchain();
        const genesisBlock = blockchain.chain[0];
        assert(genesisBlock, 'Could not find the genesis block!');
        assert(genesisBlock instanceof Block, 'genesis block should be a block!');
    })
})
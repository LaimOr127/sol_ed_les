const Blockchain = require('../Blockchain');
const Block = require('../Block');
const assert = require('assert');
const SHA256 = require("crypto-js/sha256");

describe('Blockchain', function() {
  let blockchain;
  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain.addBlock(new Block("Dan"));
    blockchain.addBlock(new Block("Peter"));
    blockchain.addBlock(new Block("James"));
  });
  
  it('should be considered valid', function() {//проверяем, что блокчейн валиден
    assert(blockchain.isValid());
  });

  describe('tampering with a previousHash', function() {
    beforeEach(() => {
      blockchain.chain[1].previousHash = SHA256("gibberish");//изменяем previousHash
    });

    it('should not be considered valid', function() {
      assert(!blockchain.isValid());//проверяем, что блокчейн не валиден
    });
  });
  
  describe('tampering with data', function() {
    beforeEach(() => {//
      blockchain.chain[0].data = "Something Else";
    });

    it('should not be considered valid', function() {//проверяем, что блокчейн не валиден
      assert(!blockchain.isValid());
    });
  });
});

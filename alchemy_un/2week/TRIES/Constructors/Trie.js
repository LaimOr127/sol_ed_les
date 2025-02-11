const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null); //корневой узел в качестве ключа
    }
}

module.exports = Trie;

const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null); //корневой узел
    }

    insert(word) {
        let currentNode = this.root; //начинаем с корня

        for (let char of word) {
            //если буквы нет среди детей, создаем новый узел
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode(char);
            }
            //следующеий узлу
            currentNode = currentNode.children[char];
        }

        //флаг в конца слова
        currentNode.isWord = true;
    }
}

module.exports = Trie;

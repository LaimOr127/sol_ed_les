const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null); // Корневой узел
    }

    insert(word) {
        let currentNode = this.root; // Начинаем с корня

        for (let char of word) {
            // Если буквы нет среди детей, создаем новый узел
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode(char);
            }
            // Переход к следующему узлу
            currentNode = currentNode.children[char];
        }

        // Устанавливаем флаг, что это конец слова
        currentNode.isWord = true;
    }
}

module.exports = Trie;

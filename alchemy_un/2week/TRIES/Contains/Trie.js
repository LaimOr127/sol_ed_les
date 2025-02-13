const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode(null); //корневой узел
    }

    insert(word) {
        let currentNode = this.root; //начинаем с корня

        for (let char of word) {//если буквы нет среди детей, создаем новый узел
            if (!currentNode.children[char]) {
                currentNode.children[char] = new TrieNode(char);
            }
            currentNode = currentNode.children[char];//переход к следующему узлу
        }

        //устанавливаем флаг конца слова
        currentNode.isWord = true;
    }

    contains(word) {
        let currentNode = this.root; //начинаем с корня

        for (let char of word) {
            if (!currentNode.children[char]) {//если буквы нет среди детей, слово отсутствует
                return false;
            }
            currentNode = currentNode.children[char];
        }

        return currentNode.isWord;
    }
}

module.exports = Trie;


/*
Пример работы contains
1) Начинаем с корневого узла.
2) Проходим по каждому символу слова:
- Если буквы нет среди children, значит слова нет → возвращаем false.
- Если буква есть, переходим к следующему узлу.
3) В конце проверяем isWord:
- true → слово есть в Trie.
- false → такого слова нет, но есть его префикс.

Примеры работы:

const trie = new Trie();
trie.insert('happy');
trie.insert('healthy');

console.log(trie.contains('happy'));    // true
console.log(trie.contains('healthy'));  // true
console.log(trie.contains('whimsical'));// false
console.log(trie.contains('health'));   // false (префикс, но не слово)

*/

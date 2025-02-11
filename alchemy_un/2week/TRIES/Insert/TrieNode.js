class TrieNode {
    constructor(key = null) {
        this.key = key;//Ключ (буква)
        this.children = {};//объект с дочерними узлами
        this.isWord = false;//лаг конца слова
    }
}

module.exports = TrieNode;

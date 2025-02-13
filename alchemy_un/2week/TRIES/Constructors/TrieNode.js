class TrieNode {
    constructor(key = null) {
        this.key = key;//ключ (буква)
        this.children = {};//объект с дочерними узлами
        this.isWord = false;//флаг конца слова
    }
}

module.exports = TrieNode;

class Tree {
    constructor() {
        this.root = null; //корень дерева равен null
    }

    addNode(node) {
        if (this.root === null) {
            this.root = node;
        } else {
            if (node.data < this.root.data) {
                this.root.left = node; //добавляем в левую ветвь
            } else {
                this.root.right = node; //добавляем в правую ветвь
            }
        }
    }
}

module.exports = Tree;

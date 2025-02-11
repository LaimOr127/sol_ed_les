class Tree {
    constructor() {
        this.root = null; //корень дерева равен null
    }

    addNode(node) {
        if (this.root === null) {
            this.root = node; //делаем узел корнем
        }
    }
}

module.exports = Tree;

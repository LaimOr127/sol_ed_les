class Tree {
    constructor() {
        this.root = null; //root равен нулю
    }

    addNode(node) {
        if (this.root === null) {
            this.root = node; // если корня нет, делаем узел корнем
        } else {
            this._insertNode(this.root, node);//вспомогательный метод
        }
    }

    _insertNode(current, node) {
        if (node.data < current.data) {
            if (current.left === null) {
                current.left = node; //, если место свободно, добавляем узел слева
            } else {
                this._insertNode(current.left, node); //иначе рекурсивно идем дальше
            }
        } else {
            if (current.right === null) {
                current.right = node;
            } else {
                this._insertNode(current.right, node);
            }
        }
    }
}

module.exports = Tree;

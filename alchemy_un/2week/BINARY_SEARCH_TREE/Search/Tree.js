class Tree {
    constructor() {
        this.root = null; //корень дерева равен null
    }

    addNode(node) {
        if (this.root === null) {
            this.root = node; //если корня нет, делаем узел корнем
        } else {
            this._insertNode(this.root, node); //вызываем вспомогательный метод
        }
    }

    _insertNode(current, node) {
        if (node.data < current.data) {
            if (current.left === null) {
                current.left = node; //добавляем узел слева, если место свободно
            } else {
                this._insertNode(current.left, node); //иначе рекурсивно идем дальше
            }
        } else {
            if (current.right === null) {
                current.right = node; //добавляем узел справа, если место свободно
            } else {
                this._insertNode(current.right, node); //иначе рекурсивно идем дальше
            }
        }
    }

    hasNode(value) {
        return this._searchNode(this.root, value);
    }

    _searchNode(current, value) {
        if (current === null) {
            return false; //если достигли конца и не нашли, возвращаем false
        }

        if (current.data === value) {
            return true; //нашли узел
        }

        if (value < current.data) {
            return this._searchNode(current.left, value); //ищем в левой части
        } else {
            return this._searchNode(current.right, value); //ищем в правой части
        }
    }
}

module.exports = Tree;

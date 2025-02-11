class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        if (this.leaves.length === 0) {
            return null;
        }

        let layer = [...this.leaves];

        while (layer.length > 1) {
            let nextLayer = [];

            for (let i = 0; i < layer.length; i += 2) {
                if (i + 1 < layer.length) {
                    nextLayer.push(this.concat(layer[i], layer[i + 1]));
                } else {
                    nextLayer.push(layer[i]); //если нечетное количество узлов, переносим последний
                }
            }

            layer = nextLayer;
        }

        return layer[0];
    }
}

module.exports = MerkleTree;

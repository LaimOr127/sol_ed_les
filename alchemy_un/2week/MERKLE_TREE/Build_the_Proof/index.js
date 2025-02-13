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
                    nextLayer.push(layer[i]); //переносим последний элемент в следующий слой
                }
            }

            layer = nextLayer;
        }

        return layer[0];
    }

    getProof(index) {
        if (index < 0 || index >= this.leaves.length) {
            throw new Error("Invalid leaf index");
        }

        let proof = [];
        let layer = [...this.leaves];
        let idx = index;

        while (layer.length > 1) {
            let nextLayer = [];

            for (let i = 0; i < layer.length; i += 2) {
                if (i + 1 < layer.length) {
                    let left = layer[i];
                    let right = layer[i + 1];
                    let parent = this.concat(left, right);
                    nextLayer.push(parent);

                    if (i === idx || i + 1 === idx) {
                        proof.push({
                            data: i === idx ? right : left,
                            left: i !== idx
                        });
                        idx = Math.floor(i / 2);
                    }
                } else {
                    nextLayer.push(layer[i]);
                    if (i === idx) {
                        idx = Math.floor(i / 2);
                    }
                }
            }

            layer = nextLayer;
        }

        return proof;
    }
}

module.exports = MerkleTree;

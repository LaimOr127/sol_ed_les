class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
    }

    getRoot() {
        if (this.leaves.length < 2) {
            throw new Error("MerkleTree requires at least two leaves.");
        }
        return this.concat(this.leaves[0], this.leaves[1]);
    }
}

module.exports = MerkleTree;

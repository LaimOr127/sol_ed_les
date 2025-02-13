function verifyProof(proof, node, root, concat) { 
    let computedHash = node;

    for (let i = 0; i < proof.length; i++) {
        const { data, left } = proof[i];

        computedHash = left ? concat(data, computedHash) : concat(computedHash, data);
    }

    return computedHash === root;
}

module.exports = verifyProof;

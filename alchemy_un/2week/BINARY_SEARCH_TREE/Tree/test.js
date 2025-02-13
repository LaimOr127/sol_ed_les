const Tree = require('../Tree');
const { assert } = require('chai');

describe('tree', () => {
    const tree = new Tree();
    
    it('should have a null root', () => {//проверяем, что корень равен null
        assert.strictEqual(tree.root, null);
    });
});
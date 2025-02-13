const Node = require('../Node');
const { assert } = require('chai');

describe('node', () => {
    const data = 3;
    const node = new Node(data);

    it('should store data', () => {//проверяем, что данные хранятся
        assert.equal(node.data, 3);
    });

    it('should have a null left', () => {//проверяем, что левый узел равен null
        assert.strictEqual(node.left, null);
    });

    it('should have a null right', () => {//проверяем, что правый узел равен null
        assert.strictEqual(node.right, null);
    });
});
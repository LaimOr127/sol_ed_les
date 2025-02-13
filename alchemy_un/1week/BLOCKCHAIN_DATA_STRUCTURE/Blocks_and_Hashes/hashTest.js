const Block = require('../Block');
const assert = require('assert');//подключаем библиотеку для тестирования

describe('Block', function() {
    const newBlock = new Block();

    it('should have a hash property', function() {//проверяем, что хэш существует
        assert(/^[0-9A-F]{64}$/i.test(newBlock.toHash()));//проверяем, что хэш является строкой из 64 символов
    });
});
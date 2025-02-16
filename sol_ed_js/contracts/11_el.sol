// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


import "./11_Own.sol";//импорт контракта Ownable

abstract contract Balances is Ownable {
    function getBalance() public view onlyOwner returns(uint) {//функция для получения баланса
        return address(this).balance;
    }
    function withdraw(address payable _to) public override virtual onlyOwner {//функция для вывода денег
        _to.transfer(getBalance());
    }
}
contract MyContract is Ownable, Balances {//контракт для вывода денег
    constructor(address _owner) {
        owner = _owner;
    }
    function withdraw(address payable _to) public override(Ownable, Balances) onlyOwner {
        //Balances.withdraw(_to);
        //Ownable.withdraw(_to);
        require(_to != address(0), "zero addr");
        super.withdraw(_to);
    }
}
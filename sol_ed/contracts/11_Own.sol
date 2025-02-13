// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


contract Ownable {
    address public owner;
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(owner == msg.sender, "not an owner!");//проверка на владельца
        _; //выход их функции require
    }
    function withdraw(address payable /* _to */) public virtual onlyOwner {//функция для вывода денег
        payable(owner).transfer(address(this).balance);
    }
}
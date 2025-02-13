// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Fallback {
    mapping(address => uint256) public contributions;
    address public owner;

    constructor() {
        owner = msg.sender;
        contributions[msg.sender] = 1000 * (1 ether);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "caller is not the owner");
        _;
    }

    function contribute() public payable {
        require(msg.value < 0.001 ether);
        contributions[msg.sender] += msg.value;
        if (contributions[msg.sender] > contributions[owner]) {
            owner =  payable (msg.sender);
        }
    }

    function getContribution() public view returns (uint256) {
        return contributions[msg.sender];
    }

    function withdraw() public onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    receive() external payable {
        require(msg.value > 0 && contributions[msg.sender] > 0);
        owner = msg.sender;
    }
}

/*
Решение задачи заключается в том, чтобы обмануть самртконракт и воспользоваться бакдором в функции receive
Для этого запускаем контракт от имени владельца и вызываем функцию contribute, далее заходим со 2-го аккаунта 
и вызывает также функцию контрибью, ео уже отправляем каие-нибудь деньги.
После этого делаем transaction со 2 аккаунта и задача решена.abi
*/
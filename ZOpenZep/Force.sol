// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Force { /*
                   MEOW ?
         /\_/\   /
    ____/ o o \
    /~____  =ø= /
    (______)__m_m)
                   */ 

//в контракт нужно добавить функцию для принятия средств

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }
}

contract Hack {
    function kill(address payable _force) external {
        (bool sent, ) = _force.call{value: address(this).balance}("");
        require(sent, "Failed to send Ether");
    }
    receive() external payable { }
}
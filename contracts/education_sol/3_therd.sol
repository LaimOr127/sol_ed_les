// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Demo{

    //mapping сопоставление (хранилище вида ключ-значение)
    mapping (address => uint) public  payments; //storage

    //адрес
    address public myAddr = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4; //storage

    function receiverFunds() public payable {
        payments[msg.sender] = msg.value;
    }
    //так можно перевлдить деньги на указанные адреса
    function transfetTo(address targetAddr, uint amount) public {
        address payable _to = payable(targetAddr);
        _to.transfer(amount);
    }


    function getBalance(address targetAddr) public view returns(uint){
        return targetAddr.balance;

    }

    //строки
    string public myStr = "test"; //storage то есть в блокчейне

    function demo(string memory newValueStr) public {
        string memory myTempStr = "temp";
        //newValueStr[0]// так делать нельзя

        myStr = newValueStr;
    }
}
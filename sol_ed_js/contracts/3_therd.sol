// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Demo_thr{

    //mapping сопоставление (хранилище вида ключ-значение)
    mapping (address => uint) public  payments; //storage

    //адрес
    address public myAddr = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4; //storage

    function receiverFunds() public payable {
        payments[msg.sender] = msg.value;
    }
    //так можно перевлдить деньги на указанные адреса
    function transfetTo(address targetAddr, uint amount) public {//функция для перевода
        address payable _to = payable(targetAddr);
        _to.transfer(amount);
    }


    function getBalance(address targetAddr) public view returns(uint){//функция для получения баланса
        return targetAddr.balance;//возвращает баланс

    }

    //строки
    string public myStr = "test"; //storage то есть в блокчейне

    function test(string memory newValueStr) public {
        // string memory myTempStr = "temp";//строка в памяти
        //newValueStr[0]// так делать нельзя

        myStr = newValueStr;// storage
    }
}
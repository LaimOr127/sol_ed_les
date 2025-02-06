// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Demo {
		// SCOPES:
    // public
    // external
    // internal
    // private
    uint public balance;
		// PAYABLE
    fallback() external payable {
        
    }
    receive() external payable {
        //balance += msg.value;
    }
    function pay() external payable { //сохраняется в блокчейне и тратит газ
        balance += msg.value;
    }
    // transaction
    function setMessage(string memory newMessage) external returns(string memory) {
        message = newMessage;
        return message;
    }
    // call не тратит газ
    function getBalance() public view returns(uint _balance) {
        _balance = address(this).balance;
        //return _balance;
    }
		string message = "hello!"; // state
    function getMessage() external view returns(string memory) {
        return message;
    }
    function rate(uint amount) public pure returns(uint) {
        return amount * 3;
    }
}
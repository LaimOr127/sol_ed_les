// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./12_ilogger.sol";

contract Logger is ILogger {
    mapping(address => uint[]) payments;

    function log (address _from, uint _amount) public{
        require(_from != address(0), "zero addr");

        payments[_from].push(_amount);
    }

    function getEntry(address _from, uint _index) public view returns(uint){
        return payments[_from][_index];
    }
}
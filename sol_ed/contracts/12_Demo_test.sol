// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

import "./12_ilogger.sol";//импорт контракта Logger


contract Demo_test {
    ILogger logger;

    constructor (address _logger){
        logger = ILogger(_logger);
    }

    function payment(address _from, uint _number ) public view returns(uint){
        return logger.getEntry(_from, _number);
    
    }

    receive() external payable {
        //прием денег
        logger.log(msg.sender, msg.value);
    }
}
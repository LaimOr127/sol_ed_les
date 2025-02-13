// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

interface IERC20{
    function name() external view returns (string memory); //в основном для metamask

    function symbol() external view returns (string memory); //наименование токена

    function decimals() external view returns (uint8); //кол-во знаков после запятой

    function totalSuply() external view returns(uint);

    function ballanceOff(address account) external view returns(uint); //баланс токена

    function transfer(address to, uint amount) external; //перевод токена

    function allowance(address owner, address spender) external view returns(uint); //сколько токенов может потратить другой адрес

    
}
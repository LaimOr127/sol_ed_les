// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {

    function double(uint x) external pure returns (uint doubled) {
        doubled = x * 2;
    }

    function double(uint x, uint y) external pure returns (uint, uint) {//функция принимает два параметра
        return (x * 2, y * 2);
    }
}

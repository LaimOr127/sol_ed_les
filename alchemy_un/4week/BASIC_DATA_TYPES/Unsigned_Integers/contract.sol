// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    uint8 public a = 42;     //uint8, значение в пределах 0-255
    uint16 public b = 512;   //uint16, значение >= 256
    uint256 public sum = a + b; //uint256, сумма a и b
}

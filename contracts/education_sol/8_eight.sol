// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

//Мерклевское дерево

contract Tree {

    bytes32[] public hashes;
    string[4] transactions = [
        "TX1: Sherlock -> Watson",
        "TX2: Watson -> Holmes",
        "TX3: Watson -> Moriarty",
        "TX4: Moriarty -> Sherlock"
    ];

    constructor() {
        for (uint i = 0; i < transactions.length; i++) {
            hashes.push(makeHash(transactions[i]));
        }

    //    ROOT
    //H1-2    H3-4
    //H1  H2  H3  H4
    //TX1 TX2 TX3 TX4

        uint count = transactions.length;
        uint offset = 0;

        while (count > 0) {//цикл для построения дерева
            for( uint i = 0; i < count - 1; i += 2) {
                hashes.push(keccak256(
                            abi.encodePacked(
                                hashes[offset + i],// 0x01, 0x02, 0x03, 0x04
                                hashes[offset + i + 1]
                            )
                            
                ));
            }
            offset += count;
            count = count / 2;
        }
    }

    function verify(string memory transaction, uint index, bytes32 root, bytes32[] memory proof) public pure returns (bool) {//функция для проверки
        bytes32 hash = makeHash(transaction);
        for( uint i = 0; i < proof.length; i++) {
           bytes32 element = proof[i];
           if (index % 2 ==0) {
                hash = keccak256(abi.encodePacked(hash, element));//хеш первого элемента и второго
              } else {
                hash = keccak256(abi.encodePacked(element, hash));
           }
           index = index / 2;
        }
        return hash == root;//возвращает true или false
    }

    function encode(string memory input) public pure returns (bytes memory) {//функция для кодирования
        return abi.encodePacked(input);
    }

    function makeHash(string memory input) public pure returns (bytes32) {
        return keccak256(
            encode(input)//энкод строки
            );
    }
}
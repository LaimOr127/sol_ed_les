// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Payments{
        // Struct
    struct Payment {
        uint amount;
        uint timestamp;
        address from;
        string message;
    }

    struct Balance {//структура для баланса
        uint totalPayments;
        mapping(uint => Payment) payments;
    }

    mapping(address => Balance) public balances;//маппинг для баланса

     event PaymentSent(address indexed from, uint amount, string message);//генерируется при транзакции

    function currentBalance() public view returns(uint) {//функция для получения текущего баланса
        return address(this).balance;
    }
 


    function getPayment(address _addr, uint _index) public view returns(Payment memory) {//функция для получения платежа
        return balances[_addr].payments[_index];
    }

    function pay(string memory message) public payable {//функция для отправки платежа (основная функция)

        emit PaymentSent(msg.sender, msg.value, message);//проверка, что сумма больше 0

        uint paymentNum = balances[msg.sender].totalPayments;
        balances[msg.sender].totalPayments++;

        Payment memory newPayment = Payment(
            msg.value,
            block.timestamp,
            msg.sender,
            message
        );

        balances[msg.sender].payments[paymentNum] = newPayment;

        emit PaymentSent(msg.sender, msg.value, message);//событие для успешной транзакции
    }
}

// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;


contract AucEngine {
    address public owner;
    uint constant DURATION = 2 days; // 2 * 24 * 60 * 60
    uint constant FEE = 10; // 10%
    // immutable
    struct Auction {// структура для хранения данных
        address payable seller;
        uint startingPrice;
        uint finalPrice;
        uint startAt;
        uint endsAt;
        uint discountRate;
        string item;
        bool stopped;
        
    }

    Auction[] public auctions;// массив для хранения данных

    event AuctionCreated(uint index, string itemName, uint startingPrice, uint duration);// событие для создания аукциона
    event AuctionEnded(uint index, uint finalPrice, address winner);

    constructor() {// конструктор для инициализации
        owner = msg.sender;
    }

    function createAuction(uint _startingPrice, uint _discountRate, string memory _item, uint _duration) external {// функция для создания аукциона
        uint duration = _duration == 0 ? DURATION : _duration;

        require(_startingPrice >= _discountRate * duration, "incorrect starting price");// проверка на корректность цены

        Auction memory newAuction = Auction({//аукуион для хранения данных
            seller: payable(msg.sender),
            startingPrice: _startingPrice,
            finalPrice: _startingPrice,
            discountRate: _discountRate,
            startAt: block.timestamp, //сейчас
            endsAt: block.timestamp + duration,
            item: _item,
            stopped: false
        });

        auctions.push(newAuction);

        emit AuctionCreated(auctions.length - 1, _item, _startingPrice, duration);//срабатывет при создании аукциона
    }

    function getPriceFor(uint index) public view returns(uint) { //функция для получения цены
        Auction memory cAuction = auctions[index];
        require(!cAuction.stopped, "stopped!");
        uint elapsed = block.timestamp - cAuction.startAt;
        uint discount = cAuction.discountRate * elapsed;
        return cAuction.startingPrice - discount;
    }

    function buy(uint index) external payable {//функция для покупки
        Auction storage cAuction = auctions[index];
        require(!cAuction.stopped, "stopped!");
        require(block.timestamp < cAuction.endsAt, "ended!");
        uint cPrice = getPriceFor(index);
        require(msg.value >= cPrice, "not enough funds!");
        cAuction.stopped = true;
        cAuction.finalPrice = cPrice;
        uint refund = msg.value - cPrice;
        if(refund > 0) {
            payable(msg.sender).transfer(refund);
        }
        cAuction.seller.transfer(// перевод денег
            cPrice - ((cPrice * FEE) / 100)
        ); 
        
        // 500
        // 500 - ((500 * 10) / 100) = 500 - 50 = 450
        // Math.floor --> JS

        emit AuctionEnded(index, cPrice, msg.sender);
    }
}
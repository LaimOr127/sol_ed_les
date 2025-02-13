class TXO {
    constructor(owner, amount) {
        this.owner = owner; //установили владельца и аналоично сумму и значение false
        this.amount = amount;
        this.spent = false;//txo не потраен
        
    }
    spend() {
        this.spent = true; //txo потраен
    }
}

module.exports = TXO;
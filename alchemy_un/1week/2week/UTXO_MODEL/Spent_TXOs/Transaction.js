class Transaction {
    constructor(inputUTXOs, outputUTXOs) {
        this.inputUTXOs = inputUTXOs;  //входные
        this.outputUTXOs = outputUTXOs; //выходные
        this.executed = false; //флаг выполнения транзакции
        this.fee = 0;//комиссия
    }

    execute() {
        if (this.executed) {
            throw new Error("Transaction has already been executed!");
        }

        for (const utxo of this.inputUTXOs) {
            if (utxo.spent) {
                throw new Error("Attempted to double-spend a TXO!");
            }
        }

        const totalInput = this.inputUTXOs.reduce((sum, utxo) => sum + utxo.amount, 0);
        const totalOutput = this.outputUTXOs.reduce((sum, utxo) => sum + utxo.amount, 0);

        if (totalInput < totalOutput) {
            throw new Error("Insufficient UTXO funds!");
        }

        this.fee = totalInput - totalOutput;//рассчет комиссии

        for (const utxo of this.inputUTXOs) {
            utxo.spend();
        }

        this.executed = true;
    }
}

module.exports = Transaction;

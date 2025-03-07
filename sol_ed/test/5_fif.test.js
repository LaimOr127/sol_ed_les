const { expect, should } = require("chai");
const { ethers } = require("hardhat");

describe("Payments", function () {
  let acc1;
  let acc2;
  let payments;

  beforeEach(async function(){
    [acc1, acc2] = await ethers.getSigners(); // получаем адреса
    const Payments = await ethers.getContractFactory("Payments", acc1);
    payments = await Payments.deploy();
    await payments.deployed(); //ждем завершения транзакции развертывания
 
  });

  it("should be deployed", async function () { //проверка на то что контракт развернут
    expect(payments.target).to.be.properAddress; //ethers v5 --> ethers v6
    console.log(payments.target);
  });

  it("should have 0 ether by default", async function(){ //проверка на то что контракт развернут
    const balance = await payments.currentBalance();
    expect(balance).to.eq(0);
  });

  it("should be possible to send funds", async function () { //проверка на то что контракт развернут
    const sum = 100;
    const msg = "hello from hardhat";
    const tx = payments.connect(acc2).pay(msg, { value: sum }); //отправляем деньги

    await expect(() => tx) // анонимная функция
      .to.changeEtherBalance(
        [acc2.address, payments.target], //ethers v5 --> ethers v6
        [-sum, sum]
      );

    await tx.wait();

    const balance = await payments.currentBalance();
    console.log(balance); // выводим баланс

    const newPayment = await payments.getPayment(acc2.address, 0); //вызов, не транзакция
    console.log(newPayment);
    expect(newPayment.message).to.eq(msg);
    expect(newPayment.amount).to.eq(sum);
    expect(newPayment.from).to.eq(acc2.address);
  });

  it("should emit PaymentSent event when paying", async function () {
    const sum = ethers.parseEther("0.5"); // 0.5 ETH
    const msgText = "test payment";
  
    console.log(`Отправка ${sum} wei с сообщением: "${msgText}" от ${acc2.address}`);
    
    const tx = await payments.connect(acc2).pay(msgText, { value: sum });
    const receipt = await tx.wait();
    console.log("Логи события:", receipt.logs);
  
    await expect(tx)//проверяем, что транзакция выполнена без ошибок
      .to.emit(payments, "PaymentSent")
      .withArgs(acc2.address, sum, msgText);
  });

  it("should fail when trying to send zero payment", async function () {// проверка на то что контракт развернут
    console.log("Попытка отправить 0 wei (ожидается ошибка)...");
    
    await expect(
      payments.connect(acc2).pay("empty payment", { value: 0 })//отправляем деньги
    ).to.be.revertedWith("Payment must be greater than zero");
  });
});

import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, Contract } from "ethers";
import { Payments } from "../typechain-types";

describe("Payments", function () {
  let acc1: Signer;
  let acc2: Signer;
  let payments: Payments;

  beforeEach(async function() {//начальная инициализация контракта
    [acc1, acc2] = await ethers.getSigners();
    const PaymentsFactory = await ethers.getContractFactory("Payments", acc1);
    payments = await PaymentsFactory.deploy() as Payments;
    await payments.waitForDeployment();
  });

  it("should be deployed", async function () {//тест на развертывание контракта
    expect(await payments.getAddress()).to.be.properAddress;
    console.log(await payments.getAddress());
  });

  it("should have 0 ether by default", async function() {//тест на наличие эфира в контракте
    const balance = await payments.currentBalance();
    expect(balance).to.eq(0);
  });

  it("should be possible to send funds", async function () {//тест на возможность отправки эфира
    const sum = 100;
    const msg = "hello from hardhat";
    const tx = await payments.connect(acc2).pay(msg, { value: sum });

    await expect(() => tx)//проверка на изменение баланса
      .to.changeEtherBalances(
        [acc2, payments],
        [-sum, sum]
      );

    const balance = await payments.currentBalance();
    console.log(balance);//вывод баланса контракта

    const addr2 = await acc2.getAddress();
    const newPayment = await payments.getPayment(addr2, 0);//получение платежа
    console.log(newPayment);
    
    expect(newPayment.message).to.eq(msg);//проверка сообщения
    expect(newPayment.amount).to.eq(sum);//проверка суммы
    expect(newPayment.from).to.eq(addr2);//проверка адреса отправителя
  });

  it("should emit PaymentSent event when paying", async function () {//тест на событие при отправке эфира
    const sum = ethers.parseEther("0.5");
    const msgText = "test payment";
    const addr2 = await acc2.getAddress();
  
    console.log(`Отправка ${sum} wei с сообщением: "${msgText}" от ${addr2}`);//вывод информации об отправке
    
    const tx = await payments.connect(acc2).pay(msgText, { value: sum });
    
    await expect(tx)
      .to.emit(payments, "PaymentSent")
      .withArgs(addr2, sum, msgText);
  });

  it("should fail when trying to send zero payment", async function () {//тест на ошибку при отправке 0 эфира
    console.log("Попытка отправить 0 wei (ожидается ошибка)...");
    
    await expect(//проверка на ошибку
      payments.connect(acc2).pay("empty payment", { value: 0 })
    ).to.be.revertedWith("Payment must be greater than zero");
  });
});
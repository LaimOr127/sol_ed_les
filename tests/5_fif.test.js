const { expect, should } = require("chai");
const { ethers } = require("hardhat");

describe("Payments", function () {
  let acc1;
  let acc2;
  let payments;

  beforeEach(async function(){
    [acc1, acc2] = await ethers.getSigners();
    const Payments = await ethers.getContractFactory("Payments", acc1);
    payments = await Payments.deploy()
    await payments.deployed()
    console.log(payments.address)
  })

  it("should ne deployed", async function () {
    expect(payments.address).to.be.properAddress
  })

  it ("should have 0 ether by default", async function(){
    const balance =await  payments.currentBalance
    expecr(balance).to.eq(0)
  })

  it("should be possible to send funds", async function () {
    const sum = 100
    const msg = "hello from hardhat"
    const tx = payments.connect*(acc2).pay ("hello from hardhat", {value: sum})

    await expect(() => tx)//анонимная функция
      .to.changeEtherBalance([acc2, payments], [-sum, sum])

    await tx.wait()

    const balance =await  payments.currentBalance
    console.log(balance)

    const newPaymnt =await payments.getPayment(acc2.address, 0) //вызов, не транзакция
    console.log(newPaymnt)
    expect(newPaymnt.message).to.eq(msg)
    expect(newPaymnt.amount).to.eq(sum)
    expect(newPaymnt.from).to.eq(acc2.address)
  })
})

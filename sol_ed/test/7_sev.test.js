const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("PaidContract", function () {
  let owner
  let other_addr
  let paid_contract

  beforeEach(async function () {
    [owner, other_addr] = await ethers.getSigners()
    const PaidContract = await ethers.getContractFactory("PaidContract", owner)
    paid_contract = await PaidContract.deploy()
    await paid_contract.deployed()
  })
  
  async function sendMoney(sender) {
    const amount = 100
    const txData = {
      to: paid_contract.address,
      value: amount
    }
    const tx = await sender.sendTransaction(txData)
    await tx.wait();
    return [tx, amount]
  }

  it("should allow to send money", async function() {//тест для проверки отправки денег
    const [sendMoneyTx, amount] = await sendMoney(other_addr)
    //console.log(sendMoneyTx)
    
    await expect(() => sendMoneyTx)
      .to.changeEtherBalance(paid_contract, amount);
    
    const timestamp = (
      await ethers.provider.getBlock(sendMoneyTx.blockNumber)//получаем блок
    ).timestamp
    await expect(sendMoneyTx)
      .to.emit(paid_contract, "Paid")
      .withArgs(other_addr.address, amount, timestamp)
  })

  it("should allow owner to withdraw funds", async function() {//тест для проверки вывода денег
    const [_, amount] = await sendMoney(other_addr)
    const tx = await paid_contract.withdraw(owner.address)
    await expect(() => tx)
      .to.changeEtherBalances([paid_contract, owner], [-amount, amount])
  })
  
  it("should not allow other accounts to withdraw funds", async function() {//тест для проверки вывода денег
    await sendMoney(other_addr)//отправляем деньги
    await expect(
      paid_contract.connect(other_addr).withdraw(other_addr.address)//проверяем, что вывод денег не возможен
    ).to.be.revertedWith("you are not an owner!")
  })
})
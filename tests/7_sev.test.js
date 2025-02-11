const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("Demo", function () {
  let owner
  let other_addr
  let demo

  beforeEach(async function () {
    [owner, other_addr] = await ethers.getSigners()
    const DemoContract = await ethers.getContractFactory("Demo", owner)
    demo = await DemoContract.deploy()
    await demo.deployed()
  })
  async function sendMoney(sender) {
    const amount = 100
    const txData = {
      to: demo.address,
      value: amount
    }
    const tx = await sender.sendTransaction(txData)
    await tx.wait();
    return [tx, amount]
  }

  it("should allow to send money", async function() {//тест для проверки отправки денег
    const [sendMoneyTx, amount] = await sendMoney(other_addr)
    console.log(sendMoneyTx)
    
    await expect(() => sendMoneyTx)
      .to.changeEtherBalance(demo, amount);
    
    const timestamp = (
      await ethers.provider.getBlock(sendMoneyTx.blockNumber)//получаем блок
    ).timestamp
    await expect(sendMoneyTx)
      .to.emit(demo, "Paid")
      .withArgs(other_addr.address, amount, timestamp)
  })

  it("should allow owner to withdraw funds", async function() {//тест для проверки вывода денег
    const [_, amount] = await sendMoney(other_addr)
    const tx = await demo.withdraw(owner.address)
    await expect(() => tx)
      .to.changeEtherBalances([demo, owner], [-amount, amount])
  })
  
  it("should not allow other accounts to withdraw funds", async function() {//тест для проверки вывода денег
    await sendMoney(other_addr)//отправляем деньги
    await expect(
      demo.connect(other_addr).withdraw(other_addr.address)//проверяем, что вывод денег не возможен
    ).to.be.revertedWith("you are not an owner!")
  })
})
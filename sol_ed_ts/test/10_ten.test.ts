const { expect } = require("chai")
const { ethers } = require("hardhat")

describe("AucEngine", function () {
  let owner: any
  let seller: any
  let buyer: any
  let auct: any

  beforeEach(async function () {
    [owner, seller, buyer] = await ethers.getSigners()

    const AucEngine = await ethers.getContractFactory("AucEngine", owner)
    auct = await AucEngine.deploy()
    await auct.waitForDeployment()
  })

  it("sets owner", async function() {//тест на установку владельца
    const currentOwner = await auct.owner()
    expect(currentOwner).to.equal(owner.address)
  })

  async function getTimestamp(bn: any) {
    return (
      await ethers.provider.getBlock(bn)
    ).timestamp
  }

  describe("createAuction", function () {//создание аукциона

    it("creates auction correctly", async function() {//тест на создание аукциона
      const duration = 60
      const tx = await auct.createAuction(
        ethers.utils.parseEther("0.0001"),
        3,
        "fake item",
        duration
      )

      const cAuction = await auct.auctions(0)
      expect(cAuction.item).to.equal("fake item")
      const ts = await getTimestamp(tx.blockNumber)
      expect(cAuction.endsAt).to.equal(ts + duration)
    })
  })

  function delay(ms: number) {//функция задержки
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  describe("buy", function () {//создание покупки лота

    it("allows to buy", async function() {//тест на возможность покупки
      await auct.connect(seller).createAuction(
        ethers.utils.parseEther("0.0001"),
        3,
        "fake item",
        60//длительность аукциона
      )

      this.timeout(5000)
      await delay(1000)//ждем 1 секунду

      const buyTx = await auct.connect(buyer).buy(0, { value: ethers.utils.parseEther("0.0001") })

      const cAuction = await auct.auctions(0)
      const finalPrice = cAuction.finalPrice
      await expect(() => buyTx).to.changeEtherBalance(
        seller, finalPrice - (finalPrice * 10n / 100n)
      )
      
      await expect(buyTx)
        .to.emit(auct, 'AuctionEnded')
        .withArgs(0, finalPrice, buyer.address)//проверка на событие
      
      await expect(
        auct.connect(buyer).buy(0, { value: ethers.utils.parseEther("0.0001") })
      ).to.be.revertedWith('stopped!')//проверка на завершение аукциона
    })
  })
})